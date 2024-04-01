// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23;

import {PRBTest} from '@prb/test/src/PRBTest.sol';
import {console2} from 'forge-std/src/console2.sol';
import {StdCheats} from 'forge-std/src/StdCheats.sol';
import {stdError} from 'forge-std/src/stdError.sol';
import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {IERC721Errors} from '@openzeppelin/contracts/interfaces/draft-IERC6093.sol';
import {IERC721Enumerable} from '@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol';
import {Merkle} from 'murky-merkle/src/Merkle.sol';

import {GlitchAuction, Bid, InvalidStartEndTime, DiscountType} from '../../src/GlitchAuction.sol';
import {Glitch, TokenVersion} from '../../src/Glitch.sol';
import {TestHelpers} from '../../script/Helpers.s.sol';

contract GlitchEndedAuctionTest is PRBTest, StdCheats, TestHelpers {
  GlitchAuction internal auction;
  Glitch internal glitch;
  address internal owner = vm.addr(2);
  address internal alice = vm.addr(3);
  address internal bob = vm.addr(4);
  uint256 internal startTime = block.timestamp + 3600 * 2; // 1 hour from now
  uint256 internal endTime = startTime + 1800; // 1 hour after start time
  uint256 internal minBidIncrementInWei = 0.01 ether;
  uint256 internal startAmountInWei = 1000;
  uint256 internal constant MAX_TOP_BIDS = 10;
  address[10] internal addresses = [
    vm.addr(42),
    vm.addr(43),
    vm.addr(44),
    vm.addr(45),
    vm.addr(46),
    vm.addr(47),
    vm.addr(48),
    vm.addr(49),
    vm.addr(50),
    vm.addr(20)
  ];

  /// @dev A function invoked before each test_ case is run.
  function setUp() public virtual {
    // Instantiate the contracts-under-test.
    glitch = new Glitch(owner);
    auction = new GlitchAuction(owner, address(glitch), owner);
    vm.deal(alice, 1 ether);

    vm.startPrank(owner);
    // set minter contract address
    glitch.setMinterContractAddress(address(auction));
    // set config for auction to start in 2 hours and end after 30 minutes
    auction.setConfig(startTime, endTime, minBidIncrementInWei, startAmountInWei);
    vm.stopPrank();
  }

  function fillTopBids() internal {
    uint64[10] memory bidAmounts = [
      10.9 ether, // 1st highest bid
      0.7 ether, // 11th highest bid
      1.9 ether, // 5th highest bid
      0.9 ether,
      10.8 ether, // 2nd highest bid
      1.8 ether,
      0.8 ether, // 10th highest bid
      10.7 ether, // 3rd highest bid
      1.7 ether, // 6th highest bid
      10.6 ether
    ];
    // Act
    for (uint256 i = 0; i < addresses.length; i++) {
      vm.startPrank(addresses[i]);
      vm.deal(addresses[i], 100 ether);
      auction.bid{value: bidAmounts[i]}(bidAmounts[i], new bytes32[](1));
      vm.stopPrank();
    }
  }

  function test_claimAll_TransferNFTsAndRefund() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 2);
    fillTopBids();

    // bid top 1
    vm.deal(alice, 100 ether);
    vm.startPrank(alice);
    uint256 aliceBid = 99 ether;
    auction.bid{value: aliceBid}(aliceBid, new bytes32[](1));

    uint256 aliceBalance = alice.balance;
    uint256 settledPrice = auction.getSettledPrice();
    uint256 refundAmount = aliceBid - settledPrice;
    uint256 tokenId = 1;

    // end the auction
    vm.warp(endTime + 1);
    // Act
    // alice claim the nfts and refund
    auction.claimAll();
    vm.stopPrank();

    // Assert
    assert(auction.claimed(alice));
    assertEq(alice.balance, aliceBalance + refundAmount, 'Caller`s bid balance should sum to refund amount');
    assertEq(glitch.ownerOf(tokenId), alice, 'NFT should be transferred to recipient');
  }
  function test_revertWhenClaimingBeforeAuctionEnding() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 2);
    fillTopBids();

    // act
    vm.deal(alice, 100 ether);
    vm.startPrank(alice);
    uint256 aliceBid = 99 ether;
    auction.bid{value: aliceBid}(aliceBid, new bytes32[](1));

    vm.warp(endTime - 200);

    // Assert
    vm.expectRevert('Auction not ended');
    auction.claimAll();
    vm.stopPrank();
  }
  function test_revertWhenClaimingTwice() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 2);
    fillTopBids();

    // bid top 1
    vm.deal(alice, 100 ether);
    vm.startPrank(alice);
    uint256 aliceBid = 99 ether;
    auction.bid{value: aliceBid}(aliceBid, new bytes32[](1));

    // end the auction
    vm.warp(endTime + 1);
    // Act
    // alice claim the nfts and refund
    auction.claimAll();
    // Assert
    vm.expectRevert('Already claimed');
    auction.claimAll();
    vm.stopPrank();
  }

  function test_claimAll_TransferNFTsAndRefund_With2WinnerBids() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 2);
    fillTopBids();

    // bid top 1
    vm.deal(alice, 100 ether);
    vm.startPrank(alice);
    uint256 aliceFirstBid = 80 ether;
    auction.bid{value: aliceFirstBid}(aliceFirstBid, new bytes32[](1));

    uint256 aliceSecondBid = auction.getMinimumBid();
    auction.bid{value: aliceSecondBid}(aliceSecondBid, new bytes32[](1));

    uint256 aliceBalance = alice.balance;
    uint256 settledPrice = auction.getSettledPrice();
    uint256 refundAmount = aliceFirstBid + aliceSecondBid - (settledPrice * 2);

    // end the auction
    vm.warp(endTime + 1);
    // Act
    // alice claim the nfts and refund
    auction.claimAll();
    vm.stopPrank();

    // Assert
    assert(auction.claimed(alice));
    assertEq(alice.balance, aliceBalance + refundAmount, 'Caller`s bid balance should sum to refund amount');
    assertEq(alice.balance, aliceBalance + aliceFirstBid - settledPrice, 'Last bid is not refunded once it`s the settled price');
    assertEq(glitch.ownerOf(1), alice, 'NFT should be minted to recipient');
    assertEq(glitch.ownerOf(2), alice, 'NFT should be minted to recipient');
  }

  function test_claimAll_TransferNFTsAndRefund_With2WinnerBidsAndOneOutbid() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 2);
    fillTopBids();

    // bid top 1
    vm.deal(alice, 100 ether);
    vm.startPrank(alice);
    uint256 aliceFirstBid = 80 ether;
    auction.bid{value: aliceFirstBid}(aliceFirstBid, new bytes32[](1));

    uint256 aliceSecondBid = auction.getMinimumBid();
    auction.bid{value: aliceSecondBid}(aliceSecondBid, new bytes32[](1));

    vm.stopPrank();

    // outbid last bid
    vm.deal(bob, 1 ether);
    vm.prank(bob);
    uint256 bobBid = auction.getMinimumBid();
    auction.bid{value: bobBid}(bobBid, new bytes32[](1));

    // end the auction
    vm.warp(endTime + 1);

    uint256 aliceBalance = alice.balance;
    uint256 settledPrice = auction.getSettledPrice();
    uint256 refundAliceAmount = aliceFirstBid - settledPrice;

    // Act
    // alice claim the nfts and refund
    vm.prank(alice);
    auction.claimAll();

    // Assert
    assert(auction.claimed(alice));
    assert(!auction.claimed(bob));
    assertEq(glitch.balanceOf(alice), 1, 'Alice must be owner of one NFT');
    assertEq(alice.balance, aliceBalance + refundAliceAmount + aliceSecondBid, 'Caller`s bid balance should sum to refund amount');
    assertEq(glitch.ownerOf(1), alice, 'NFT should be minted to recipient');

    vm.expectRevert(abi.encodeWithSelector(IERC721Errors.ERC721NonexistentToken.selector, 2));
    glitch.ownerOf(2);
  }
  function test_claimAll_TransferNFTsAndRefund_LastBidWithoutRefund() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 2);
    fillTopBids();

    // bid as the last one
    vm.deal(alice, 100 ether);
    uint256 aliceBid = auction.getMinimumBid();

    vm.prank(alice);
    auction.bid{value: aliceBid}(aliceBid, new bytes32[](1));

    // end the auction
    vm.warp(endTime + 1);

    uint256 aliceBalance = alice.balance;
    uint256 settledPrice = auction.getSettledPrice();

    // Act
    // alice claim the nfts and refund
    vm.prank(alice);
    auction.claimAll();

    // Assert
    assert(auction.claimed(alice));
    assertEq(glitch.balanceOf(alice), 1, 'Alice must be owner of one NFT');
    assertEq(alice.balance, aliceBalance, 'Alice bid should keep the same after claim refund');
    assertEq(settledPrice, aliceBid, 'Settled price should be equal to last bid which is aliceBid');
    assertEq(glitch.ownerOf(1), alice, 'NFT should be minted to recipient');
  }

  function test_refundEtherToOutbiddedUser() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 1);
    vm.deal(alice, 100 ether);

    // Act
    vm.startPrank(alice);
    uint256 aliceBid = 0.1 ether;
    auction.bid{value: aliceBid}(aliceBid, new bytes32[](1));
    uint256 aliceSecondBid = auction.getMinimumBid();
    auction.bid{value: aliceSecondBid}(aliceSecondBid, new bytes32[](1));
    vm.stopPrank();

    fillTopBids();
    vm.warp(endTime + 1);

    uint256 aliceBalance = alice.balance;
    vm.prank(alice);
    auction.claimAll();

    // Assert
    assertEq(alice.balance, aliceBalance + aliceBid + aliceSecondBid, 'Alice balance should have been refunded correctly');
    assertEq(glitch.balanceOf(alice), 0, 'Alice nft balance should be zero');
  }

  function test_withdrawCorrectValue() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 1);
    fillTopBids();
    vm.warp(endTime + 1);
    uint256 settledPrice = auction.getSettledPrice();
    uint256 ownerBalance = owner.balance;

    // Act
    vm.prank(owner);
    auction.withdraw();

    // Assert
    assertEq(owner.balance, ownerBalance + settledPrice * MAX_TOP_BIDS, '');
  }
  function test_revertWhenWithdrawingTwice() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 1);
    fillTopBids();
    vm.warp(endTime + 1);

    // Act
    vm.prank(owner);
    auction.withdraw();

    // Assert
    vm.prank(owner);
    vm.expectRevert('Already withdrawn');
    auction.withdraw();
  }
  function test_revertWhenWithdrawIfNotOwner() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 1);
    fillTopBids();
    vm.warp(endTime);

    // Assert
    vm.prank(alice);
    vm.expectRevert('Only owner');
    auction.withdraw();
  }
  function test_revertWhenWithdrawBeforeAuctionEnding() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 1);
    fillTopBids();

    // Assert
    vm.prank(owner);
    vm.expectRevert('Auction not ended');
    auction.withdraw();
  }
  function test_adminMintAndAuctionWorksFine() public {
    // Arrange
    vm.startPrank(owner);
    glitch.adminMint(alice, 5);
    vm.warp(startTime + 1);
    glitch.adminMint(bob, 3);
    vm.stopPrank();

    // Act
    fillTopBids();
    vm.deal(alice, 1 ether);
    vm.prank(alice);
    auction.bid{value: 1 ether}(1 ether, new bytes32[](1));

    vm.warp(endTime + 1);
    vm.prank(alice);
    auction.claimAll();

    // Assert
    assertEq(glitch.balanceOf(alice), 6, 'Alice should own 6 NFTs');
    assertEq(glitch.balanceOf(bob), 3, 'Bob should own 3 NFTs');
    assertEq(glitch.ownerOf(9), alice, 'NFT should be minted to recipient');
    assertEq(glitch.ownerOf(7), bob, 'NFT should be minted to recipient');

    vm.expectRevert(abi.encodeWithSelector(IERC721Errors.ERC721NonexistentToken.selector, 10));
    glitch.ownerOf(10);
  }

  function test_canSetNewTreasuryWallet() public {
    vm.prank(owner);
    auction.setTreasuryWallet(alice);
    assertEq(auction.treasuryWallet(), alice);
  }

  function test_revertWhenSetTreasuryWalletIfNotOwner() public {
    vm.prank(alice);
    vm.expectRevert('Only owner');
    auction.setTreasuryWallet(alice);
  }

  function test_revertWhenSetTreasuryWalletIfZeroAddress() public {
    vm.expectRevert('Invalid address');
    vm.prank(owner);
    auction.setTreasuryWallet(address(0));
  }

  function test_afterAllClaimedContractMustHaveZeroBalance() public {
    vm.warp(startTime + 1);
    fillTopBids();
    vm.warp(endTime + 1);

    uint256 contractBalanceAfterAuction = address(auction).balance;
    for (uint256 i = 0; i < addresses.length; i++) {
      vm.prank(addresses[i]);
      auction.claimAll();
    }
    vm.prank(owner);
    auction.withdraw();

    assertNotEq(contractBalanceAfterAuction, 0, 'Contract balance before withdraw and claim should be not zero');
    assertEq(address(auction).balance, 0, 'Contract balance after withdraw and claim should be zero');
  }

  function test_bidWithFirstTierDiscount() public {
    // Arrange
    vm.warp(startTime + 1);
    fillTopBids();

    // Create merkle root and set it
    Merkle m = new Merkle();
    bytes32[] memory data = new bytes32[](2);
    data[0] = keccak256(abi.encodePacked(alice));
    data[1] = keccak256(abi.encodePacked(bob));
    bytes32 root = m.getRoot(data);

    vm.prank(owner);
    auction.setMerkleRoots(root, root);

    // Act
    // get proof and bid
    bytes32[] memory proof = m.getProof(data, 0); // will get proof for 0x2 value
    uint256 aliceBid = 1 ether;
    vm.deal(alice, aliceBid);
    vm.prank(alice);
    auction.bid{value: aliceBid}(aliceBid, proof);

    vm.warp(endTime + 1);

    uint256 aliceBalanceBeforeClaim = alice.balance;
    vm.prank(alice);
    auction.claimAll();

    // Assert
    uint256 settledPriceWithDiscount = (auction.getSettledPrice() * 80) / 100;
    assertEq(glitch.balanceOf(alice), 1, 'Alice should own 1 NFT');
    assertEq(alice.balance, aliceBalanceBeforeClaim + aliceBid - settledPriceWithDiscount, 'Alice should receive refund with first tier discount');
  }
  function test_bidWithSecondTierDiscount() public {
    // Arrange
    vm.warp(startTime + 1);
    fillTopBids();

    // Create merkle root and set it
    Merkle m = new Merkle();
    bytes32[] memory data = new bytes32[](2);
    data[0] = keccak256(abi.encodePacked(alice));
    data[1] = keccak256(abi.encodePacked(bob));
    bytes32 root = m.getRoot(data);

    vm.prank(owner);
    auction.setMerkleRoots(bytes32(''), root);

    // Act
    // get proof and bid
    bytes32[] memory proof = m.getProof(data, 0); // will get proof for 0x2 value
    uint256 aliceBid = 1 ether;
    vm.deal(alice, aliceBid);
    vm.prank(alice);
    auction.bid{value: aliceBid}(aliceBid, proof);

    vm.warp(endTime + 1);

    uint256 aliceBalanceBeforeClaim = alice.balance;
    vm.prank(alice);
    auction.claimAll();

    // Assert
    uint256 settledPriceWithDiscount = (auction.getSettledPrice() * 85) / 100;
    assertEq(glitch.balanceOf(alice), 1, 'Alice should own 1 NFT');
    assertEq(alice.balance, aliceBalanceBeforeClaim + aliceBid - settledPriceWithDiscount, 'Alice should receive refund with first tier discount');
  }

  function test_withdrawCorrectValueAfterBuysWithDiscount() public {
    // Arrange
    // Create merkle root and set it
    Merkle firstTierMerkle = new Merkle();
    Merkle secondTierMerkle = new Merkle();
    bytes32[] memory firstData = new bytes32[](3);
    bytes32[] memory secondData = new bytes32[](4);
    firstData[0] = keccak256(abi.encodePacked(alice));
    firstData[1] = keccak256(abi.encodePacked(vm.addr(1112)));
    firstData[2] = keccak256(abi.encodePacked(vm.addr(1113)));
    secondData[0] = keccak256(abi.encodePacked(bob));
    secondData[1] = keccak256(abi.encodePacked(alice));
    secondData[2] = keccak256(abi.encodePacked(vm.addr(1115)));
    secondData[3] = keccak256(abi.encodePacked(vm.addr(1117)));
    bytes32 firstTierRoot = firstTierMerkle.getRoot(firstData);
    bytes32 secondTierRoot = secondTierMerkle.getRoot(secondData);

    // Act
    uint256 bid = 5 ether;
    vm.deal(alice, bid);
    vm.deal(bob, bid);

    vm.prank(owner);
    auction.setMerkleRoots(firstTierRoot, secondTierRoot);

    vm.warp(startTime + 1);

    // alice bid
    vm.startPrank(alice);
    auction.bid{value: bid}(bid, firstTierMerkle.getProof(firstData, 0));
    vm.stopPrank();

    // bob bid
    vm.startPrank(bob);
    auction.bid{value: bid}(bid, secondTierMerkle.getProof(secondData, 0));
    vm.stopPrank();

    // fill top bids
    fillTopBids();
    vm.warp(endTime + 1);

    uint256 settledPrice = auction.getSettledPrice();
    uint256 settledPriceWithTierOneDiscount = auction.getSettledPriceWithDiscount(DiscountType.FirstTier);
    uint256 settledPriceWithTierTwoDiscount = auction.getSettledPriceWithDiscount(DiscountType.SecondTier);
    uint256 discountedNfts = 2;
    uint256 salesAmount = settledPrice * (MAX_TOP_BIDS - discountedNfts) + settledPriceWithTierOneDiscount + settledPriceWithTierTwoDiscount;
    uint256 ownerBalance = owner.balance;

    vm.prank(alice);
    auction.claimAll();
    vm.prank(bob);
    auction.claimAll();

    for (uint256 i = 0; i < addresses.length; i++) {
      vm.prank(addresses[i]);
      auction.claimAll();
    }

    vm.prank(owner);
    auction.withdraw();

    // Assert
    assertEq(glitch.balanceOf(alice), 1, 'Alice should own 1 NFT');
    assertEq(owner.balance, ownerBalance + salesAmount, '');

    assertEq(address(auction).balance, 0, 'Contract balance after withdraw and claim should be zero');
  }
}
