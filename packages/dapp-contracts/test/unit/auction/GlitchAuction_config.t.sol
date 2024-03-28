// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23;

import {PRBTest} from '@prb/test/src/PRBTest.sol';
import {console2} from 'forge-std/src/console2.sol';
import {StdCheats} from 'forge-std/src/StdCheats.sol';
import {stdError} from 'forge-std/src/stdError.sol';
import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {IERC721Errors} from '@openzeppelin/contracts/interfaces/draft-IERC6093.sol';

import {GlitchAuction, Config, ConfigAlreadySet} from '../../../src/GlitchAuction.sol';

contract GlitchConfigTest is PRBTest, StdCheats {
  GlitchAuction internal auction;
  address internal owner = vm.addr(2);
  address internal alice = vm.addr(3);
  address internal bob = vm.addr(4);

  /// @dev A function invoked before each test_ case is run.
  function setUp() public virtual {
    // Instantiate the contract-under-test.
    auction = new GlitchAuction(owner, owner);
  }

  // DEPLOY
  function test_deployWithInitialOwner() public {
    GlitchAuction newAuction = new GlitchAuction(owner, owner);
    assertEq(newAuction.owner(), owner, 'Incorrect initial owner');
  }

  // Set valid configuration parameters and verify they are stored correctly.
  function test_setValidConfigurationParameters() public {
    // Arrange
    uint256 startTime = block.timestamp + 3600; // 1 hour from now
    uint256 endTime = startTime + 3600; // 1 hour after start time
    uint256 minBidIncrementInWei = 100;
    uint256 startAmountInWei = 1000;

    // Act
    vm.prank(owner);
    auction.setConfig(startTime, endTime, minBidIncrementInWei, startAmountInWei);
    Config memory config = auction.getConfig();

    // Assert
    assertEq(config.startTime, startTime, 'Start time should be set correctly');
    assertEq(config.endTime, endTime, 'End time should be set correctly');
    assertEq(config.minBidIncrementInWei, minBidIncrementInWei, 'Min bid increment should be set correctly');
  }

  function test_revertIfConfigAlreadySetAndStartTimeInPast() public {
    // Arrange
    uint256 startTime = block.timestamp - 100;
    uint256 endTime = startTime + 1000;
    uint256 minBidIncrementInWei = 100;
    uint256 startAmountInWei = 1000;

    vm.prank(owner);
    auction.setConfig(block.timestamp, endTime, minBidIncrementInWei, startAmountInWei);

    // Act and Assert
    vm.prank(owner);
    vm.expectRevert(ConfigAlreadySet.selector);
    auction.setConfig(startTime, endTime, minBidIncrementInWei, startAmountInWei);
  }
  function test_revertIfCalledByNonOwner() public {
    // Arrange
    uint256 startTime = block.timestamp + 3600; // 1 hour from now
    uint256 endTime = startTime + 3600; // 1 hour after start time
    uint256 minBidIncrementInWei = 100;
    uint256 startAmountInWei = 1000;

    // Act
    vm.prank(alice);

    // As
    vm.expectRevert('Only owner');
    auction.setConfig(startTime, endTime, minBidIncrementInWei, startAmountInWei);
  }
}
