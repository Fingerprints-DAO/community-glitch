// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {PRBTest} from '@prb/test/src/PRBTest.sol';
import {console2} from 'forge-std/src/console2.sol';
import {StdCheats} from 'forge-std/src/StdCheats.sol';
import {stdError} from 'forge-std/src/stdError.sol';
import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {IERC721Errors} from '@openzeppelin/contracts/interfaces/draft-IERC6093.sol';
import {IERC721Enumerable} from '@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol';
import {Merkle} from 'murky-merkle/src/Merkle.sol';

import {GlitchAuction} from '../../src/GlitchAuction.sol';
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

  /// @dev A function invoked before each test_ case is run.
  function setUp() public virtual {
    // Instantiate the contracts-under-test.
    glitch = new Glitch(owner, owner, 'https://google.com/');
    auction = new GlitchAuction(owner, address(glitch), owner);
    vm.deal(alice, 1 ether);

    vm.startPrank(owner);
    // set minter contract address
    glitch.setMinterContractAddress(address(auction));
    // set config for auction to start in 2 hours and end after 30 minutes
    auction.setConfig(startTime, endTime, minBidIncrementInWei, startAmountInWei);
    vm.stopPrank();
  }

  function test_claimAll_TransferNFTsAndRefund() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 2);
    fillTopBids(auction);

    // bid top 1
    vm.deal(alice, 100 ether);
    vm.startPrank(alice);
    uint256 aliceBid = 99 ether;
    auction.bid{value: aliceBid}(aliceBid, fakeMerkleProof);

    uint256 aliceBalance = alice.balance;
    uint256 settledPrice = auction.getSettledPrice();
    uint256 refundAmount = aliceBid - settledPrice;
    uint256 tokenId = 1;

    // end the auction
    vm.warp(endTime + 1);
    // Act
    // alice claim the nfts and refund
    auction.claimAll(alice);
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
    fillTopBids(auction);

    // act
    vm.deal(alice, 100 ether);
    vm.startPrank(alice);
    uint256 aliceBid = 99 ether;
    auction.bid{value: aliceBid}(aliceBid, fakeMerkleProof);

    vm.warp(endTime - 200);

    // Assert
    vm.expectRevert('Auction not ended');
    auction.claimAll(alice);
    vm.stopPrank();
  }
  function test_revertWhenClaimingTwice() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 2);
    fillTopBids(auction);

    // bid top 1
    vm.deal(alice, 100 ether);
    vm.startPrank(alice);
    uint256 aliceBid = 99 ether;
    auction.bid{value: aliceBid}(aliceBid, fakeMerkleProof);

    // end the auction
    vm.warp(endTime + 1);
    // Act
    // alice claim the nfts and refund
    auction.claimAll(alice);
    // Assert
    vm.expectRevert('Already claimed');
    auction.claimAll(alice);
    vm.stopPrank();
  }

  function test_claimAll_TransferNFTsAndRefund_With2WinnerBids() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 2);
    fillTopBids(auction);

    // bid top 1
    vm.deal(alice, 100 ether);
    vm.startPrank(alice);
    uint256 aliceFirstBid = 80 ether;
    auction.bid{value: aliceFirstBid}(aliceFirstBid, fakeMerkleProof);

    uint256 aliceSecondBid = auction.getMinimumBid();
    auction.bid{value: aliceSecondBid}(aliceSecondBid, fakeMerkleProof);

    uint256 aliceBalance = alice.balance;
    uint256 settledPrice = auction.getSettledPrice();
    uint256 refundAmount = aliceFirstBid + aliceSecondBid - (settledPrice * 2);

    // end the auction
    vm.warp(endTime + 1);
    // Act
    // alice claim the nfts and refund
    auction.claimAll(alice);
    vm.stopPrank();

    // Assert
    assert(auction.claimed(alice));
    assertEq(alice.balance, aliceBalance + refundAmount, 'Caller`s bid balance should sum to refund amount');
    assertEq(alice.balance, aliceBalance + aliceFirstBid - settledPrice, 'Last bid is not refunded once it`s the settled price');
    assertEq(glitch.ownerOf(1), alice, 'NFT should be minted to recipient');
    assertEq(glitch.ownerOf(50), alice, 'NFT should be minted to recipient');
  }

  function test_claimAll_TransferNFTsAndRefund_With2WinnerBidsAndOneOutbid() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 2);
    fillTopBids(auction);

    // bid top 1
    vm.deal(alice, 100 ether);
    vm.startPrank(alice);
    uint256 aliceFirstBid = 80 ether;
    auction.bid{value: aliceFirstBid}(aliceFirstBid, fakeMerkleProof);

    uint256 aliceSecondBid = auction.getMinimumBid();
    auction.bid{value: aliceSecondBid}(aliceSecondBid, fakeMerkleProof);

    vm.stopPrank();

    // outbid last bid
    vm.deal(bob, 1 ether);
    vm.prank(bob);
    uint256 bobBid = auction.getMinimumBid();
    auction.bid{value: bobBid}(bobBid, fakeMerkleProof);

    // end the auction
    vm.warp(endTime + 1);

    uint256 aliceBalance = alice.balance;
    uint256 settledPrice = auction.getSettledPrice();
    uint256 refundAliceAmount = aliceFirstBid - settledPrice;

    // Act
    // alice claim the nfts and refund
    vm.prank(alice);
    auction.claimAll(alice);

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
    fillTopBids(auction);

    // bid as the last one
    vm.deal(alice, 100 ether);
    uint256 aliceBid = auction.getMinimumBid();

    vm.prank(alice);
    auction.bid{value: aliceBid}(aliceBid, fakeMerkleProof);

    // end the auction
    vm.warp(endTime + 1);

    uint256 aliceBalance = alice.balance;
    uint256 settledPrice = auction.getSettledPrice();

    // Act
    // alice claim the nfts and refund
    vm.prank(alice);
    auction.claimAll(alice);

    // Assert
    assert(auction.claimed(alice));
    assertEq(auction.getTopBids()[49].bidder, alice, 'Last highest bid should be alice');
    assertEq(glitch.balanceOf(alice), 1, 'Alice must be owner of one NFT');
    assertEq(alice.balance, aliceBalance, 'Alice bid should keep the same after claim refund');
    assertEq(settledPrice, aliceBid, 'Settled price should be equal to last bid which is aliceBid');
    assertEq(glitch.ownerOf(50), alice, 'NFT should be minted to recipient');
  }

  function test_refundEtherToOutbiddedUser() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 1);
    vm.deal(alice, 100 ether);

    // Act
    vm.startPrank(alice);
    uint256 aliceBid = 0.1 ether;
    auction.bid{value: aliceBid}(aliceBid, fakeMerkleProof);
    uint256 aliceSecondBid = auction.getMinimumBid();
    auction.bid{value: aliceSecondBid}(aliceSecondBid, fakeMerkleProof);
    vm.stopPrank();

    fillTopBids(auction);
    vm.warp(endTime + 1);

    uint256 aliceBalance = alice.balance;
    vm.prank(alice);
    auction.claimAll(alice);

    // Assert
    assertEq(alice.balance, aliceBalance + aliceBid + aliceSecondBid, 'Alice balance should have been refunded correctly');
    assertEq(glitch.balanceOf(alice), 0, 'Alice nft balance should be zero');
  }

  function test_withdrawCorrectValue() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 1);
    fillTopBids(auction);
    vm.warp(endTime + 1);
    uint256 settledPrice = auction.getSettledPrice();
    uint256 ownerBalance = owner.balance;

    // Act
    vm.prank(owner);
    auction.withdraw();

    // Assert
    assertEq(owner.balance, ownerBalance + settledPrice * MAX_TOP_BIDS, '');
  }

  function test_withdrawCorrectValueWith5Bids() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 1);
    for (uint256 i = 0; i < 5; i++) {
      vm.startPrank(addresses[i]);
      vm.deal(addresses[i], 1 ether);
      auction.bid{value: 0.1 ether}(0.1 ether, fakeMerkleProof);
      vm.stopPrank();
    }
    vm.warp(endTime + 1);
    uint256 settledPrice = auction.getSettledPrice();
    uint256 ownerBalance = owner.balance;

    // Act
    vm.prank(owner);
    auction.withdraw();

    // Assert
    assertEq(owner.balance, ownerBalance + settledPrice * 5, '');
  }

  function test_revertWhenWithdrawingTwice() public {
    // Arrange
    // fill top bids
    vm.warp(startTime + 1);
    fillTopBids(auction);
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
    fillTopBids(auction);
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
    fillTopBids(auction);

    // Assert
    vm.prank(owner);
    vm.expectRevert('Auction not ended');
    auction.withdraw();
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
    fillTopBids(auction);
    vm.warp(endTime + 1);

    uint256 contractBalanceAfterAuction = address(auction).balance;
    for (uint256 i = 0; i < addresses.length; i++) {
      vm.prank(addresses[i]);
      auction.claimAll(addresses[i]);
    }
    vm.prank(owner);
    auction.withdraw();

    assertNotEq(contractBalanceAfterAuction, 0, 'Contract balance before withdraw and claim should be not zero');
    assertEq(address(auction).balance, 0, 'Contract balance after withdraw and claim should be zero');
  }
  function test_afterWithdrawnUsersCanClaimCorrectly() public {
    vm.warp(startTime + 1);
    fillTopBids(auction);
    vm.warp(endTime + 1);

    vm.prank(owner);
    auction.withdraw();

    uint256 contractBalanceAfterAuction = address(auction).balance;
    for (uint256 i = 0; i < addresses.length; i++) {
      vm.prank(addresses[i]);
      auction.claimAll(addresses[i]);
    }

    assertNotEq(contractBalanceAfterAuction, 0, 'Contract balance before withdraw and claim should be not zero');
    assertEq(address(auction).balance, 0, 'Contract balance after withdraw and claim should be zero');
  }
  function test_afterWithdrawnUsersCanClaimCorrectlyWith5Bids() public {
    vm.warp(startTime + 1);

    for (uint256 i = 0; i < 5; i++) {
      vm.startPrank(addresses[i]);
      vm.deal(addresses[i], 1 ether);
      auction.bid{value: 0.1 ether}(0.1 ether, fakeMerkleProof);
      vm.stopPrank();
    }
    vm.warp(endTime + 1);

    uint256 contractBalanceAfterAuction = address(auction).balance;

    vm.prank(owner);
    auction.withdraw();

    for (uint256 i = 0; i < 5; i++) {
      auction.claimAll(addresses[i]);
    }

    assertNotEq(contractBalanceAfterAuction, 0, 'Contract balance before withdraw and claim should be not zero');
    assertEq(address(auction).balance, 0, 'Contract balance after withdraw and claim should be zero');
  }

  function test_BidderClaimNFTsIDsProperly() public {
    vm.warp(startTime + 1);
    fillTopBids(auction);
    GlitchAuction.Bid[50] memory topBids = auction.getTopBids();

    vm.deal(bob, 10000 ether);
    vm.startPrank(bob);
    auction.bid{value: topBids[0].amount + 1 ether}(topBids[0].amount + 1 ether, fakeMerkleProof);

    topBids = auction.getTopBids();
    auction.bid{value: topBids[4].amount + 0.00001 ether}(topBids[4].amount + 0.00001 ether, fakeMerkleProof);

    auction.bid{value: auction.getMinimumBid()}(auction.getMinimumBid(), fakeMerkleProof);
    vm.stopPrank();

    vm.warp(endTime + 1);

    auction.claimAll(bob);

    assertEq(glitch.balanceOf(bob), 3, 'Bob should have 3 NFTs');
    assertEq(glitch.ownerOf(1), bob, 'NFT #1 should be owned by Bob');
    assertEq(glitch.ownerOf(5), bob, 'NFT #5 should be owned by Bob');
    assertEq(glitch.ownerOf(50), bob, 'NFT #10 should be owned by Bob');
  }

  function test_bidWithFirstTierDiscount() public {
    // Arrange
    vm.warp(startTime + 1);
    fillTopBids(auction);

    // Create merkle root and set it
    Merkle m = new Merkle();
    bytes32[] memory data = new bytes32[](2);
    data[0] = keccak256(abi.encodePacked(alice));
    data[1] = keccak256(abi.encodePacked(bob));
    bytes32 root = m.getRoot(data);

    vm.prank(owner);
    auction.setMerkleRoots(root);

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
    auction.claimAll(alice);

    // Assert
    uint256 settledPriceWithDiscount = (auction.getSettledPrice() * (100 - DISCOUNT_PERCENTAGE)) / 100;
    assertEq(glitch.balanceOf(alice), 1, 'Alice should own 1 NFT');
    assertEq(alice.balance, aliceBalanceBeforeClaim + aliceBid - settledPriceWithDiscount, 'Alice should receive refund with first tier discount');
  }

  function test_withdrawCorrectValueAfterBuysWithDiscount() public {
    // Arrange
    // Create merkle root and set it
    Merkle firstTierMerkle = new Merkle();
    bytes32[] memory firstData = new bytes32[](3);
    firstData[0] = keccak256(abi.encodePacked(alice));
    firstData[1] = keccak256(abi.encodePacked(vm.addr(1112)));
    firstData[2] = keccak256(abi.encodePacked(vm.addr(1113)));
    bytes32 firstTierRoot = firstTierMerkle.getRoot(firstData);

    // Act
    uint256 bid = 5 ether;
    vm.deal(alice, bid);
    vm.deal(bob, bid);

    vm.prank(owner);
    auction.setMerkleRoots(firstTierRoot);

    vm.warp(startTime + 1);

    // alice bid
    vm.startPrank(alice);
    auction.bid{value: bid}(bid, firstTierMerkle.getProof(firstData, 0));
    vm.stopPrank();

    // fill top bids
    fillTopBids(auction);
    vm.warp(endTime + 1);

    uint256 settledPrice = auction.getSettledPrice();
    uint256 settledPriceWithTierOneDiscount = auction.getSettledPriceWithDiscount(GlitchAuction.DiscountType.FirstTier);
    uint256 discountedNfts = 1;
    uint256 salesAmount = settledPrice * (MAX_TOP_BIDS - discountedNfts) + settledPriceWithTierOneDiscount;
    uint256 ownerBalance = owner.balance;

    auction.claimAll(alice);
    auction.claimAll(bob);

    for (uint256 i = 0; i < addresses.length; i++) {
      vm.prank(addresses[i]);
      auction.claimAll(addresses[i]);
    }

    vm.prank(owner);
    auction.withdraw();

    // Assert
    assertEq(glitch.balanceOf(alice), 1, 'Alice should own 1 NFT');
    assertEq(owner.balance, ownerBalance + salesAmount, '');
    assertEq(address(auction).balance, 0, 'Contract balance after withdraw and claim should be zero');
  }

  function test_adminCanMintRemainingNFTsWhenAuctionEnds() public {
    // Arrange
    uint256 bidsCounter = 5;

    // act
    vm.warp(startTime + 1);
    for (uint256 i = 0; i < bidsCounter; i++) {
      vm.startPrank(addresses[i]);
      vm.deal(addresses[i], 100 ether);
      auction.bid{value: (i + 1) * 1 ether}((i + 1) * 1 ether, fakeMerkleProof);
      vm.stopPrank();
    }

    vm.warp(endTime + 1);

    for (uint256 i = 0; i < bidsCounter; i++) {
      auction.claimAll(addresses[i]);
    }

    vm.startPrank(owner);
    auction.adminMintRemaining(alice);
    vm.stopPrank();

    // Assert
    assertEq(glitch.balanceOf(alice), MAX_TOP_BIDS - bidsCounter, 'Alice should own 5 NFT');
    assertEq(glitch.balanceOf(addresses[1]), 1, 'addresses[1] should own 1 NFT');
    assertEq(glitch.balanceOf(addresses[4]), 1, 'addresses[1] should own 1 NFT');
  }
  function test_revertIfCallAdminMintRemainingBeforeAuctionEnd() public {
    // Arrange
    uint256 bidsCounter = 5;

    // act
    vm.warp(startTime + 1);
    for (uint256 i = 0; i < bidsCounter; i++) {
      vm.startPrank(addresses[i]);
      vm.deal(addresses[i], 100 ether);
      auction.bid{value: (i + 1) * 1 ether}((i + 1) * 1 ether, fakeMerkleProof);
      vm.stopPrank();
    }

    // Assert
    vm.startPrank(owner);
    vm.expectRevert('Auction not ended');
    auction.adminMintRemaining(alice);
    vm.stopPrank();
  }
}
