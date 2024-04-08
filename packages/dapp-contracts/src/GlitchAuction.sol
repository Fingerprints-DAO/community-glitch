// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {IERC721} from '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import {IERC721Enumerable} from '@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';
import {MerkleProof} from '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';
import {ReentrancyGuard} from '@openzeppelin/contracts/utils/ReentrancyGuard.sol';
import {Pausable} from '@openzeppelin/contracts/utils/Pausable.sol';
import {Address} from '@openzeppelin/contracts/utils/Address.sol';
import {Base} from './Base.sol';
import {IGlitch} from './IGlitch.sol';
// import {console2} from 'forge-std/src/console2.sol';

enum DiscountType {
  None,
  FirstTier,
  SecondTier
}

/// @dev Represents a bid in the auction.
struct Bid {
  address bidder;
  uint256 amount;
  DiscountType discountType;
}

/// @dev Represents the auction configuration.
struct Config {
  /// @notice The start time of the auction.
  uint256 startTime;
  /// @notice The end time of the auction.
  uint256 endTime;
  /// @notice The minimum value to increase the current bid in WEI.
  uint256 minBidIncrementInWei;
  /// @notice The starting amount in WEI.
  uint256 startAmountInWei;
}

/// @dev Emitted when the amount of wei provided for a bid or starting bid is invalid. This usually means the amount is zero.
error InvalidAmountInWei();

/// @dev Emitted when the provided minimum bid increment value is invalid. This usually means the value is either zero.
error InvalidMinBidIncrementValue();

/// @dev Emitted when the provided start or end time for the auction is invalid. This usually means the start time is greater than the end time.
error InvalidStartEndTime(uint256 startTime, uint256 endTime);

/// @dev Emitted when a config-related operation is attempted before the config has been set.
error ConfigNotSet();

// @dev Emitted when a bid is placed.
event BidPlaced(address indexed bidder, uint256 amount);

// @dev Emitted when a bid is outbid.
event Outbid(address indexed bidder, uint256 amount, uint256 lastBidPosition);

event Claimed(address indexed to, uint256 nftAmount, uint256 refundAmount);

contract GlitchAuction is Base, ReentrancyGuard, Pausable {
  using Address for address payable;
  /**
   * @notice MAX_TOP_BIDS represents the maximum number of top bids that can be stored.
   */
  uint256 public constant MAX_TOP_BIDS = 10;

  /// @dev The merkle root for members of FingerprintsDAO. 20%
  bytes32 public firstTierMerkleRoot;

  /// @dev The merkle root for holders and communities. 15%
  bytes32 public secondTierMerkleRoot;

  /**
   * @notice treasuryWallet stores the address of the treasury wallet where auction funds are sent.
   */
  address payable public treasuryWallet;

  /**
   * @notice withdrawn indicates whether the auction funds have been withdrawn post-auction.
   */
  bool public withdrawn;

  /**
   * @notice erc721Address stores the address of the ERC721 token (Glitch NFT) being auctioned.
   */
  IGlitch public erc721Address;

  /**
   * @notice topBids stores the top bids in the auction up to a maximum of MAX_TOP_BIDS.
   */
  Bid[MAX_TOP_BIDS] public topBids;

  /**
   * @notice bidBalances maps each bidder's address to their total bid amount in the auction.
   */
  mapping(address => uint256) public bidBalances;

  /**
   * @notice claimed maps each bidder's address to a boolean indicating whether they have claimed their NFT and/or refund.
   */
  mapping(address => bool) public claimed;

  /**
   * @dev _config stores the configuration of the auction, including start time, end time, and minimum bid increment.
   */
  Config private _config;

  /**
   * @dev Modifier to check if the configuration is valid.
   * @dev Throws ConfigNotSet error if the start time is not set.
   */
  modifier validConfig() {
    if (_config.startTime == 0) revert ConfigNotSet();
    _;
  }

  /**
   * @dev Modifier to check if the current block timestamp is within the specified start and end time.
   * @dev Throws InvalidStartEndTime error if the current timestamp is not between the start and end time.
   */
  modifier validTime() {
    Config memory config = _config;
    if (block.timestamp >= config.endTime || block.timestamp <= config.startTime) revert InvalidStartEndTime(config.startTime, config.endTime);
    _;
  }

  /**
   * @dev Modifier to check if the caller is the owner
   */
  modifier _onlyOwner() {
    require(_msgSender() == owner(), 'Only owner');
    _;
  }

  /**
   * @dev Constructor to initialize the auction with the owner and the ERC721 address.
   * @param initialOwner The initial owner of the contract.
   * @param _erc721Address The address of the ERC721 token to be auctioned.
   */
  constructor(address initialOwner, address _erc721Address, address _treasuryWallet) Ownable(initialOwner) {
    erc721Address = IGlitch(_erc721Address);
    treasuryWallet = payable(_treasuryWallet);
  }

  /**
   * @dev Allows the owner to pause the auction.
   */
  function pause() external onlyOwner {
    _pause();
  }

  /**
   * @dev Allows the owner to unpause the auction.
   */
  function unpause() external onlyOwner {
    _unpause();
  }

  /**
   * @notice Sets the configuration parameters for the auction.
   * @dev This function can only be called by an admin. It can be used to set the start time, end time,
   *  minimum bid increment in WEI, and starting bid amount.
   * @param _startTime Auction start time
   * @param _endTime Auction end time
   * @param _minBidIncrementInWei Auction minimum bid increment in WEI
   * @param _startAmountInWei Auction starting bid
   */
  function setConfig(uint256 _startTime, uint256 _endTime, uint256 _minBidIncrementInWei, uint256 _startAmountInWei) external _onlyOwner {
    if (_startTime == 0 || _startTime >= _endTime) revert InvalidStartEndTime(_startTime, _endTime);
    if (_startAmountInWei == 0) revert InvalidAmountInWei();

    if (_minBidIncrementInWei == 0) revert InvalidMinBidIncrementValue();

    _config = Config({startTime: _startTime, endTime: _endTime, minBidIncrementInWei: _minBidIncrementInWei, startAmountInWei: _startAmountInWei});
  }

  /**
   * @dev Allows the owner to set a new treasury wallet address.
   * @param newWallet The new treasury wallet address.
   */
  function setTreasuryWallet(address newWallet) external _onlyOwner {
    require(newWallet != address(0), 'Invalid address');
    treasuryWallet = payable(newWallet);
  }

  /// @dev Updates the merkle roots
  function setMerkleRoots(bytes32 _firstTierRoot, bytes32 _secondTierRoot) external onlyOwner {
    firstTierMerkleRoot = _firstTierRoot;
    secondTierMerkleRoot = _secondTierRoot;
  }

  /// @dev Returns if a wallet address/proof is part of the given merkle root.
  function checkMerkleProof(bytes32[] calldata merkleProof, address _address, bytes32 _root) public pure returns (bool) {
    bytes32 leaf = keccak256(abi.encodePacked(_address));
    return MerkleProof.verify(merkleProof, _root, leaf);
  }

  /**
   * @dev Allows users to place bids on the auction.
   * @param bidAmount The amount of the bid.
   */
  function bid(uint256 bidAmount, bytes32[] calldata merkleProof) external payable validConfig validTime whenNotPaused nonReentrant {
    require(bidAmount >= getMinimumBid(), 'Bid too low');
    uint256 totalBidAmount = bidBalances[_msgSender()] + msg.value;
    require(totalBidAmount >= bidAmount, 'Insufficient funds for bid');

    bidBalances[_msgSender()] = totalBidAmount - bidAmount;
    processBid(_msgSender(), bidAmount, _getTierDiscount(merkleProof, _msgSender()));
  }

  /**
   * @dev Internal function to process a bid.
   * @param bidder The address of the bidder.
   * @param amount The amount of the bid.
   */
  function processBid(address bidder, uint256 amount, DiscountType discountType) private {
    uint256 position;

    // Find the position of the new bid in the top bids
    while (position < MAX_TOP_BIDS && topBids[position].amount >= amount) {
      unchecked {
        ++position;
      }
    }

    require(position < MAX_TOP_BIDS, 'Bid does not qualify for top bids');
    emit BidPlaced(bidder, amount);

    // Remove the old top bid
    Bid memory outbid = topBids[MAX_TOP_BIDS - 1];
    if (outbid.bidder != address(0)) {
      emit Outbid(outbid.bidder, outbid.amount, position);
      bidBalances[outbid.bidder] = bidBalances[outbid.bidder] + outbid.amount;
    }

    // Insert the new bid
    for (uint256 i = MAX_TOP_BIDS - 1; i > position; i--) {
      topBids[i] = topBids[i - 1];
    }
    topBids[position] = Bid(bidder, amount, discountType);
  }

  /**
   * @dev Allows users to claim their NFTs and any refunds after the auction ends.
   * @param _to The claimer address.
   */
  function claimAll(address _to) external validConfig whenNotPaused nonReentrant {
    require(block.timestamp > _config.endTime, 'Auction not ended');
    require(!claimed[_to], 'Already claimed');

    uint256 nftsMinted;
    uint256 amountSpent;
    DiscountType discountType = DiscountType.None;
    uint256 balance = bidBalances[_to];
    claimed[_to] = true;

    for (uint256 i; i < MAX_TOP_BIDS; ) {
      if (topBids[i].bidder == _to) {
        erc721Address.mint(_to, i + 1);
        nftsMinted++;
        amountSpent += topBids[i].amount;
        if (topBids[i].discountType != DiscountType.None) {
          discountType = topBids[i].discountType;
        }
      }
      unchecked {
        ++i;
      }
    }

    uint256 refundAmount = balance + (amountSpent - (nftsMinted * getSettledPriceWithDiscount(discountType)));
    if (refundAmount > 0) {
      payable(_to).sendValue(refundAmount);
    }
    emit Claimed(_to, nftsMinted, refundAmount);
  }

  /**
   * @dev Allows the owner to mint the remaining NFTs after the auction ends.
   * @param _recipient The recipient address.
   */
  function adminMintRemaining(address _recipient) external _onlyOwner validConfig {
    require(block.timestamp > _config.endTime, 'Auction not ended');
    uint256 lastBidPosition = _getLastBidPosition();
    for (uint256 i = lastBidPosition + 1; i < MAX_TOP_BIDS; ) {
      erc721Address.mint(_recipient, i + 1);
      unchecked {
        ++i;
      }
    }
  }

  /**
   * @dev Allows the owner to withdraw the sales amount after the auction ends.
   */
  function withdraw() external _onlyOwner nonReentrant {
    require(block.timestamp > _config.endTime, 'Auction not ended');
    require(!withdrawn, 'Already withdrawn');
    withdrawn = true;
    uint256 givenFirstTierDiscount;
    uint256 givenSecondTierDiscount;
    uint256 salesAmountWithoutDiscount;

    for (uint256 i; i < MAX_TOP_BIDS; ) {
      if (topBids[i].bidder == address(0)) {
        break;
      }
      if (topBids[i].discountType == DiscountType.FirstTier) {
        givenFirstTierDiscount++;
      } else if (topBids[i].discountType == DiscountType.SecondTier) {
        givenSecondTierDiscount++;
      } else {
        salesAmountWithoutDiscount++;
      }
      unchecked {
        ++i;
      }
    }

    uint256 salesAmountWithDiscount = getSettledPriceWithDiscount(DiscountType.FirstTier) *
      givenFirstTierDiscount +
      getSettledPriceWithDiscount(DiscountType.SecondTier) *
      givenSecondTierDiscount;
    uint256 salesAmount = getSettledPrice() * salesAmountWithoutDiscount;
    (bool success, ) = treasuryWallet.call{value: salesAmountWithDiscount + salesAmount}('');
    require(success, 'Transfer failed.');
  }

  /**
   * @dev Returns the tier discount type of an address.
   * @param addressToCheck The address to check.
   * @return The tier discount type.
   */
  function _getTierDiscount(bytes32[] calldata merkleProof, address addressToCheck) private view returns (DiscountType) {
    if (merkleProof.length == 0) {
      return DiscountType.None;
    }
    if (checkMerkleProof(merkleProof, addressToCheck, firstTierMerkleRoot)) {
      return DiscountType.FirstTier;
    }
    if (checkMerkleProof(merkleProof, addressToCheck, secondTierMerkleRoot)) {
      return DiscountType.SecondTier;
    }

    return DiscountType.None;
  }

  /**
   * @dev Returns the last bid position.
   * @return lastBidPosition The last bid position.
   */
  function _getLastBidPosition() private view returns (uint256 lastBidPosition) {
    lastBidPosition = MAX_TOP_BIDS;

    while (lastBidPosition > 0 && topBids[lastBidPosition - 1].amount == 0) {
      lastBidPosition--;
    }

    lastBidPosition--;
  }

  /**
   * @dev Returns the settled price of the auction.
   * @return The price of the lowest winning bid.
   */
  function getSettledPrice() public view returns (uint256) {
    uint256 lastBidPosition = _getLastBidPosition();
    uint256 lastBidAmount = topBids[lastBidPosition].amount;
    return lastBidAmount < _config.startAmountInWei ? _config.startAmountInWei : lastBidAmount;
  }

  /**
   * @dev Returns the settled price of the auction with discount.
   * @param discountType The type of discount to apply.
   * @return The price of the lowest winning bid.
   */
  function getSettledPriceWithDiscount(DiscountType discountType) public view returns (uint256) {
    if (discountType == DiscountType.None) {
      return getSettledPrice();
    }

    if (discountType == DiscountType.FirstTier) {
      return (getSettledPrice() * 80) / 100; // 20% discount
    }

    return (getSettledPrice() * 85) / 100; // 15% discount
  }
  /**
   * @dev Returns the minimum bid amount required to place a bid.
   * @return The minimum bid amount.
   */
  function getMinimumBid() public view returns (uint256) {
    uint256 lastBidAmount = topBids[MAX_TOP_BIDS - 1].amount;
    return lastBidAmount < _config.startAmountInWei ? _config.startAmountInWei : lastBidAmount + _config.minBidIncrementInWei;
  }
  /**
   * @dev Returns the current configuration of the auction.
   * @return The auction configuration.
   */
  function getConfig() external view returns (Config memory) {
    return _config;
  }

  /**
   * @dev Returns the top bids of the auction.
   * @return An array of the top bids.
   */
  function getTopBids() external view returns (Bid[MAX_TOP_BIDS] memory) {
    return topBids;
  }
}
