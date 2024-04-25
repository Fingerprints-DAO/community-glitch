// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

interface IGlitchAuction {
  type DiscountType is uint8;

  struct Bid {
    address bidder;
    uint256 amount;
    DiscountType discountType;
  }

  struct Config {
    uint256 startTime;
    uint256 endTime;
    uint256 minBidIncrementInWei;
    uint256 startAmountInWei;
  }

  error AddressInsufficientBalance(address account);
  error AlreadyClaimed();
  error AuctionNotEnded();
  error BidDoesNotQualifyForTopBids();
  error BidTooLow();
  error ConfigNotSet();
  error EnforcedPause();
  error ExpectedPause();
  error FailedInnerCall();
  error InsufficientFundsForBid();
  error InvalidAddress();
  error InvalidAmountInWei();
  error InvalidMinBidIncrementValue();
  error InvalidStartEndTime(uint256 startTime, uint256 endTime);
  error OnlyOwner();
  error OwnableInvalidOwner(address owner);
  error OwnableUnauthorizedAccount(address account);
  error ReentrancyGuardReentrantCall();
  error TransferFailed();

  event BidPlaced(address indexed bidder, uint256 amount);
  event Claimed(address indexed to, uint256 nftAmount, uint256 refundAmount);
  event Outbidded(address indexed bidder, uint256 amount, uint256 lastBidPosition);
  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
  event Paused(address account);
  event Unpaused(address account);

  function MAX_TOP_BIDS() external view returns (uint256);
  function adminMintRemaining(address _recipient) external;
  function bid(uint256 _bidAmount, bytes32[] memory _merkleProof) external payable;
  function bidBalances(address) external view returns (uint256);
  function checkMerkleProof(bytes32[] memory _merkleProof, address _address, bytes32 _root) external pure returns (bool);
  function claimAll(address _to) external;
  function claimed(address) external view returns (bool);
  function firstTierMerkleRoot() external view returns (bytes32);
  function forceRefund(address _to) external;
  function getConfig() external view returns (Config memory);
  function getMinimumBid() external view returns (uint256);
  function getSettledPrice() external view returns (uint256);
  function getSettledPriceWithDiscount(DiscountType _discountType) external view returns (uint256);
  function getTopBids() external view returns (Bid[50] memory);
  function glitchAddress() external view returns (address);
  function owner() external view returns (address);
  function pause() external;
  function paused() external view returns (bool);
  function renounceOwnership() external;
  function setConfig(uint256 _startTime, uint256 _endTime, uint256 _minBidIncrementInWei, uint256 _startAmountInWei) external;
  function setGlitchAddress(address _glitchAddress) external;
  function setMerkleRoots(bytes32 _firstTierRoot) external;
  function setTreasuryWallet(address _newWallet) external;
  function topBids(uint256) external view returns (address bidder, uint256 amount, DiscountType discountType);
  function transferOwnership(address newOwner) external;
  function treasuryWallet() external view returns (address payable);
  function unpause() external;
  function withdraw() external;
  function withdrawn() external view returns (bool);
}
