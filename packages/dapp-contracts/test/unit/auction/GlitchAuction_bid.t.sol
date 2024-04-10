// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {PRBTest} from '@prb/test/src/PRBTest.sol';
import {console2} from 'forge-std/src/console2.sol';
import {StdCheats} from 'forge-std/src/StdCheats.sol';
import {stdError} from 'forge-std/src/stdError.sol';
import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {IERC721Errors} from '@openzeppelin/contracts/interfaces/draft-IERC6093.sol';
import {IERC721Enumerable} from '@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol';
import {TestHelpers} from '../../../script/Helpers.s.sol';

import {GlitchAuction} from '../../../src/GlitchAuction.sol';

contract GlitchBidTest is PRBTest, StdCheats, TestHelpers {
  GlitchAuction internal auction;
  address internal owner = vm.addr(2);
  address internal alice = vm.addr(3);
  address internal bob = vm.addr(4);
  uint256 internal startTime = block.timestamp + 3600 * 2; // 1 hour from now
  uint256 internal endTime = startTime + 1800; // 1 hour after start time
  uint256 internal minBidIncrementInWei = 0.005 ether;
  uint256 internal startAmountInWei = 0.06 ether;

  /// @dev A function invoked before each test_ case is run.
  function setUp() public virtual {
    // Instantiate the contract-under-test.
    auction = new GlitchAuction(owner, owner, owner);
    vm.deal(alice, 1 ether);
    // set config for auction to start in 2 hours and end after 30 minutes
    vm.prank(owner);
    auction.setConfig(startTime, endTime, minBidIncrementInWei, startAmountInWei);
  }

  // User can successfully place a bid with a bid amount greater than the current 10th highest bid.
  function test_successfulBidWithHigherAmount() public {
    // Arrange
    uint256 bidAmount = 0.1 ether;
    vm.warp(startTime + 2);

    // Act
    vm.prank(alice);
    auction.bid{value: bidAmount}(bidAmount, fakeMerkleProof);
    GlitchAuction.Bid[50] memory bids = auction.getTopBids();
    uint256 highestBidAmount = bids[0].amount;

    // Assert
    // Check that the bid was successful by verifying that the new bid amount is now the 10th highest bid
    assertEq(highestBidAmount, bidAmount, 'Bid was not successful');
  }

  function test_BidManyTimesAndCheckOrder() public {
    // Arrange
    // create a list to iterate with 11 bids, in a predetermined order
    address[11] memory bidders = [
      vm.addr(42),
      vm.addr(43),
      vm.addr(44),
      vm.addr(45),
      vm.addr(46),
      vm.addr(47),
      vm.addr(48),
      vm.addr(49),
      vm.addr(50),
      vm.addr(20),
      vm.addr(51)
    ];
    uint64[11] memory bids = [
      10.9 ether, // 1st highest bid
      0.7 ether, // 11th highest bid
      1.9 ether, // 5th highest bid
      0.9 ether,
      10.8 ether, // 2nd highest bid
      1.8 ether,
      0.8 ether, // 10th highest bid
      10.7 ether, // 3rd highest bid
      1.7 ether, // 6th highest bid
      10.6 ether, // 4th highest bid
      1.6 ether
    ];
    // list of bidAmounts ordered using loop
    uint64[11] memory orderedBidAmounts;
    // set up the orderedBidAmounts list
    for (uint256 i = 0; i < 11; i++) {
      orderedBidAmounts[i] = bids[i];
    }
    // now, sort the array using a simple bubble sort in descending order
    for (uint256 i = 0; i < 10; i++) {
      for (uint256 j = 0; j < 10 - i; j++) {
        if (orderedBidAmounts[j] < orderedBidAmounts[j + 1]) {
          // swap
          uint64 temp = orderedBidAmounts[j];
          orderedBidAmounts[j] = orderedBidAmounts[j + 1];
          orderedBidAmounts[j + 1] = temp;
        }
      }
    }

    vm.warp(startTime + 2);

    // Act
    for (uint256 i = 0; i < bidders.length; i++) {
      vm.startPrank(bidders[i]);
      vm.deal(bidders[i], 100 ether);
      auction.bid{value: bids[i]}(bids[i], fakeMerkleProof);
      vm.stopPrank();
    }
    // Assert
    GlitchAuction.Bid[50] memory topBids = auction.getTopBids();
    for (uint256 i = 0; i < 10; i++) {
      assertEq(topBids[i].amount, orderedBidAmounts[i], 'Incorrect order of bids');
    }
    // Manual assert
    assertEq(topBids[0].amount, 10.9 ether, 'Incorrect order of bids');
    assertEq(topBids[4].amount, 1.9 ether, 'Incorrect order of bids');
    assertEq(topBids[9].amount, 0.8 ether, 'Incorrect order of bids');
  }

  function test_outbidCantBidUsingBalance() public {
    // Arrange
    vm.warp(startTime + 2);
    fillTopBids(auction);
    GlitchAuction.Bid memory lowestBid = auction.getTopBids()[49];
    uint256 minimumBid = auction.getMinimumBid();

    // Act
    vm.prank(alice);
    auction.bid{value: minimumBid}(minimumBid, fakeMerkleProof);

    minimumBid = auction.getMinimumBid();
    vm.startPrank(lowestBid.bidder);

    vm.expectRevert(GlitchAuction.InsufficientFundsForBid.selector);
    auction.bid{value: minimumBid - lowestBid.amount}(minimumBid, fakeMerkleProof);
    vm.stopPrank();
  }

  function test_balanceAccumulatesWhenOutbidded() public {
    // Arrange
    address fakeBidder = vm.addr(5555);
    uint256 minBidIncrease = auction.getConfig().minBidIncrementInWei;
    vm.deal(fakeBidder, 100 ether);
    vm.deal(bob, 100 ether);

    vm.warp(startTime + 2);
    fillTopBids(auction);

    // fake bidder bid the lowest 2 bids
    uint256 secondLowestBid = (auction.getTopBids()[48]).amount + 0.01 ether;
    uint256 outbiddedValue = secondLowestBid * 2;

    // Act
    vm.startPrank(fakeBidder);
    auction.bid{value: secondLowestBid}(secondLowestBid, fakeMerkleProof);
    auction.bid{value: secondLowestBid}(secondLowestBid, fakeMerkleProof);
    vm.stopPrank();

    secondLowestBid = (auction.getTopBids()[48]).amount;
    vm.startPrank(bob);
    auction.bid{value: secondLowestBid + minBidIncrease}(secondLowestBid + minBidIncrease, fakeMerkleProof);
    auction.bid{value: secondLowestBid + minBidIncrease}(secondLowestBid + minBidIncrease, fakeMerkleProof);
    vm.stopPrank();

    // Assert
    assertEq(auction.bidBalances(fakeBidder), outbiddedValue, 'Lowest bidder balance is wrong');
    assertNotEq(fakeBidder, auction.getTopBids()[48].bidder, 'Second lowest bidder is not the second lowest');
    assertEq(auction.getTopBids()[48].bidder, bob, 'Bob is not the second lowest bidder');
    assertEq(auction.getTopBids()[49].bidder, bob, 'Bob bid is not the lowest bidder');
  }

  // check if a bid with the same value doesnt outbid previous bid with the same value
  function test_dontOutbidWithSameValue() public {
    // Arrange
    vm.warp(startTime + 2);
    fillTopBids(auction);
    GlitchAuction.Bid memory highestBid = auction.getTopBids()[0];
    vm.deal(alice, 100 ether);

    // Act
    vm.prank(alice);
    auction.bid{value: highestBid.amount}(highestBid.amount, fakeMerkleProof);

    // Assert
    assertEq(auction.getTopBids()[0].amount, highestBid.amount, 'Highest bid keeps the same amount');
    assertEq(auction.getTopBids()[0].bidder, highestBid.bidder, 'Highest bid keeps the same bidder');
    assertEq(auction.getTopBids()[1].bidder, alice, 'Alice bid is the second highest');
  }

  function test_firstBidMustBeStartAmountInWei() public {
    // Arrange
    vm.warp(startTime + 2);

    // Act
    vm.deal(alice, 1 ether);
    vm.prank(alice);
    auction.bid{value: startAmountInWei}(startAmountInWei, fakeMerkleProof);

    // Assert
    assertEq(auction.getTopBids()[0].bidder, alice, 'Bid was not successful');
  }
  function test_settledPriceMustBeTheUniqueBid() public {
    // Arrange
    vm.warp(startTime + 2);

    // Act
    vm.deal(alice, 1 ether);
    vm.deal(bob, 1 ether);
    // vm.prank(alice);
    // auction.bid{value: 0.5 ether}(0.5 ether, fakeMerkleProof);

    uint256 bobBid = 0.4 ether;
    vm.prank(bob);
    auction.bid{value: bobBid}(bobBid, fakeMerkleProof);

    vm.warp(endTime + 1);

    // Assert
    assertEq(auction.getSettledPrice(), bobBid, 'Settled price is wrong');
    assertEq(auction.getSettledPrice(), auction.getTopBids()[0].amount, 'Settled price is wrong');
  }
  function test_settledPriceMustBeLastBidEvenWeDontFillAllBids() public {
    // Arrange
    vm.warp(startTime + 2);

    // Act
    vm.deal(alice, 1 ether);
    vm.deal(bob, 1 ether);
    vm.prank(alice);
    auction.bid{value: 0.5 ether}(0.5 ether, fakeMerkleProof);

    uint256 bobBid = 0.4 ether;
    vm.prank(bob);
    auction.bid{value: bobBid}(bobBid, fakeMerkleProof);

    vm.warp(endTime + 1);

    // Assert
    assertEq(auction.getSettledPrice(), bobBid, 'Settled price is wrong');
    assertEq(auction.getSettledPrice(), auction.getTopBids()[1].amount, 'Settled price is wrong');
  }
}
