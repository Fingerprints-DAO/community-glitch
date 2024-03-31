// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23;

import {PRBTest} from '@prb/test/src/PRBTest.sol';
import {console2} from 'forge-std/src/console2.sol';
import {StdCheats} from 'forge-std/src/StdCheats.sol';
import {stdError} from 'forge-std/src/stdError.sol';
import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {IERC721Errors} from '@openzeppelin/contracts/interfaces/draft-IERC6093.sol';
import {IERC721Enumerable} from '@openzeppelin/contracts/token/ERC721/extensions/IERC721Enumerable.sol';

import {GlitchAuction, Bid, InvalidStartEndTime} from '../../src/GlitchAuction.sol';
import {TestHelpers} from '../../script/Helpers.s.sol';

contract GlitchEndedAuctionTest is PRBTest, StdCheats, TestHelpers {
  GlitchAuction internal auction;
  address internal owner = vm.addr(2);
  address internal alice = vm.addr(3);
  address internal bob = vm.addr(4);
  uint256 internal startTime = block.timestamp + 3600 * 2; // 1 hour from now
  uint256 internal endTime = startTime + 1800; // 1 hour after start time
  uint256 internal minBidIncrementInWei = 0.01 ether;
  uint256 internal startAmountInWei = 1000;

  /// @dev A function invoked before each test_ case is run.
  function setUp() public virtual {
    // Instantiate the contract-under-test.
    auction = new GlitchAuction(owner, owner);
    vm.deal(alice, 1 ether);
    // set config for auction to start in 2 hours and end after 30 minutes
    vm.prank(owner);
    auction.setConfig(startTime, endTime, minBidIncrementInWei, startAmountInWei);
  }
}
