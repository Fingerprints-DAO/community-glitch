// SPDX-License-Identifier: MIT
pragma solidity >=0.8.23;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';
import {Base} from './Base.sol';
import {IGlitch} from './IGlitch.sol';
// import {console2} from 'forge-std/src/console2.sol';

struct Bid {
  address bidder;
  uint256 amount;
}

/// @dev Represents the auction configuration
struct Config {
  /// @notice The start time of the auction.
  uint256 startTime;
  /// @notice The end time of the auction.
  uint256 endTime;
  /// @notice The minimum value to increase the current bid in WEI.
  uint256 minBidIncrementInWei;
}

/// @dev Emitted when the amount of wei provided for a bid or starting bid is invalid. This usually means the amount is zero.
error InvalidAmountInWei();

/// @dev Emitted when the provided minimum bid increment value is invalid. This usually means the value is either zero.
error InvalidMinBidIncrementValue();

/// @dev Emitted when the provided start or end time for the auction is invalid. This usually means the start time is greater than the end time.
error InvalidStartEndTime(uint256 startTime, uint256 endTime);

/// @dev Emitted when a config-related operation is attempted before the config has been set.
error ConfigNotSet();

contract GlitchAuction is Base {
  uint256 public constant MAX_TOP_BIDS = 10;
  IGlitch public erc721Address;
  Bid[MAX_TOP_BIDS] public topBids;
  mapping(address => uint256) public bidBalances;
  mapping(address => bool) public claimed;
  /// @dev Auction Config
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
    require(msg.sender == owner(), 'Only owner');
    _;
  }

  constructor(address initialOwner, address _erc721Address) Ownable(initialOwner) {
    erc721Address = IGlitch(_erc721Address);
  }

  /// @notice Sets the configuration parameters for the auction.
  /// @dev This function can only be called by an admin. It can be used to set the start time, end time,
  /// minimum bid increment in WEI, and starting bid amount.
  /// @param _startTime Auction start time
  /// @param _endTime Auction end time
  /// @param _minBidIncrementInWei Auction minimum bid increment in WEI
  /// @param _startAmountInWei Auction starting bid
  function setConfig(uint256 _startTime, uint256 _endTime, uint256 _minBidIncrementInWei, uint256 _startAmountInWei) external _onlyOwner {
    if (_startTime == 0 || _startTime >= _endTime) revert InvalidStartEndTime(_startTime, _endTime);
    if (_startAmountInWei == 0) revert InvalidAmountInWei();

    if (_minBidIncrementInWei == 0) revert InvalidMinBidIncrementValue();

    _config = Config({startTime: _startTime, endTime: _endTime, minBidIncrementInWei: _minBidIncrementInWei});
  }

  function getMinimumBid() public view returns (uint256) {
    return topBids[MAX_TOP_BIDS - 1].amount + _config.minBidIncrementInWei;
  }

  function bid(uint256 bidAmount) public payable validConfig validTime {
    require(bidAmount >= getMinimumBid(), 'Bid too low');
    uint256 totalBidAmount = bidBalances[msg.sender] + msg.value;
    require(totalBidAmount >= bidAmount, 'Insufficient funds for bid');

    bidBalances[msg.sender] = totalBidAmount - bidAmount;
    processBid(msg.sender, bidAmount);
  }

  function processBid(address bidder, uint256 amount) internal {
    uint256 position;
    for (position = 0; position < MAX_TOP_BIDS; position++) {
      if (amount > topBids[position].amount) {
        break;
      }
    }

    require(position < MAX_TOP_BIDS, 'Bid does not qualify for top bids');

    Bid memory outbid = topBids[MAX_TOP_BIDS - 1];
    bidBalances[outbid.bidder] = bidBalances[outbid.bidder] + outbid.amount;

    for (uint256 i = MAX_TOP_BIDS - 1; i > position; i--) {
      topBids[i] = topBids[i - 1];
    }

    topBids[position] = Bid(bidder, amount);
  }

  // function claimNFT() public {
  //   require(_config.endTime > block.timestamp, 'Auction not ended');

  //   uint256 tokenId = 0;
  //   for (uint256 i = 0; i < MAX_TOP_BIDS; i++) {
  //     if (topBids[i].bidder == msg.sender) {
  //       tokenId = i + 1;
  //       break;
  //     }
  //   }

  //   require(tokenId > 0, 'Not a top bidder or already claimed');
  //   erc721Address.mint(msg.sender);
  // }

  // function claimRefund() public {
  //   require(_config.endTime > block.timestamp, 'Auction not ended');
  //   uint256 refundAmount = bidBalances[msg.sender];
  //   require(refundAmount > 0, 'No refund available');
  //   bidBalances[msg.sender] = 0;
  //   payable(msg.sender).transfer(refundAmount);
  // }

  function claimAll() public {
    require(block.timestamp > _config.endTime, 'Auction not ended');
    require(!claimed[msg.sender], 'Already claimed');

    uint256 nftsMinted = 0;
    uint256 amountSpent = 0;
    claimed[msg.sender] = true;
    for (uint256 i = 0; i < MAX_TOP_BIDS; i++) {
      if (topBids[i].bidder == msg.sender) {
        // erc721Address.safeTransferFrom(address(this), msg.sender, i + 1);
        erc721Address.mint(msg.sender);
        nftsMinted++;
        amountSpent += topBids[i].amount;
      }
    }
    uint256 refundAmount = bidBalances[msg.sender] + (amountSpent - (nftsMinted * topBids[MAX_TOP_BIDS - 1].amount));
    if (refundAmount > 0) {
      bidBalances[msg.sender] = 0;
      payable(msg.sender).transfer(refundAmount);
    }
  }

  function getSettledPrice() external view returns (uint256) {
    return topBids[MAX_TOP_BIDS - 1].amount;
  }
  /// @notice Gets the current configuration parameters of the auction.
  /// @return config A struct containing the start time, end time, minimum bid increment in WEI, and starting bid amount of the auction.
  function getConfig() external view returns (Config memory) {
    return _config;
  }

  function getTopBids() external view returns (Bid[MAX_TOP_BIDS] memory) {
    return topBids;
  }
}
