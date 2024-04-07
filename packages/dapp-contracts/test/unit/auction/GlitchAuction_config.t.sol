// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {PRBTest} from '@prb/test/src/PRBTest.sol';
import {console2} from 'forge-std/src/console2.sol';
import {StdCheats} from 'forge-std/src/StdCheats.sol';
import {stdError} from 'forge-std/src/stdError.sol';
import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {IERC721Errors} from '@openzeppelin/contracts/interfaces/draft-IERC6093.sol';

import {GlitchAuction, Config, InvalidStartEndTime} from '../../../src/GlitchAuction.sol';

contract GlitchConfigTest is PRBTest, StdCheats {
  GlitchAuction internal auction;
  address internal owner = vm.addr(2);
  address internal alice = vm.addr(3);
  address internal bob = vm.addr(4);
  uint256 internal startTime = block.timestamp + 3600; // 1 hour from now
  uint256 internal endTime = startTime + 3600; // 1 hour after start time
  uint256 internal minBidIncrementInWei = 100;
  uint256 internal startAmountInWei = 1000;

  /// @dev A function invoked before each test_ case is run.
  function setUp() public virtual {
    // Instantiate the contract-under-test.
    auction = new GlitchAuction(owner, owner, owner);
  }

  // DEPLOY
  function test_deployWithInitialOwner() public {
    GlitchAuction newAuction = new GlitchAuction(owner, owner, owner);
    assertEq(newAuction.owner(), owner, 'Incorrect initial owner');
  }

  // Set valid configuration parameters and verify they are stored correctly.
  function test_setValidConfigurationParameters() public {
    // Arrange

    // Act
    vm.prank(owner);
    auction.setConfig(startTime, endTime, minBidIncrementInWei, startAmountInWei);
    Config memory config = auction.getConfig();

    // Assert
    assertEq(config.startTime, startTime, 'Start time should be set correctly');
    assertEq(config.endTime, endTime, 'End time should be set correctly');
    assertEq(config.minBidIncrementInWei, minBidIncrementInWei, 'Min bid increment should be set correctly');
  }

  function test_revertIfCalledByNonOwner() public {
    // Act
    vm.prank(alice);

    // As
    vm.expectRevert('Only owner');
    auction.setConfig(startTime, endTime, minBidIncrementInWei, startAmountInWei);
  }

  // Test if can bid after auction ended
  function test_canBidAfterEnded() public {
    // Arrange
    vm.prank(owner);
    auction.setConfig(startTime, endTime, minBidIncrementInWei, startAmountInWei);
    vm.warp(startTime + 2);
    uint256 minBid = auction.getMinimumBid();

    // Act
    vm.deal(alice, 1 ether);
    vm.prank(alice);
    auction.bid{value: minBid}(minBid, new bytes32[](1));
    vm.warp(endTime);

    // Assert
    minBid = auction.getMinimumBid();
    vm.prank(alice);
    vm.expectRevert(abi.encodeWithSelector(InvalidStartEndTime.selector, startTime, endTime));
    auction.bid{value: minBid}(minBid, new bytes32[](1));
  }
}
