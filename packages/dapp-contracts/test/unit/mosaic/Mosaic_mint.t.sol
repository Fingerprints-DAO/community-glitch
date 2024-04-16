// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {PRBTest} from '@prb/test/src/PRBTest.sol';
import {console2} from 'forge-std/src/console2.sol';
import {StdCheats} from 'forge-std/src/StdCheats.sol';
import {stdError} from 'forge-std/src/stdError.sol';
import {TestHelpers} from '../../../script/Helpers.s.sol';

import {Mosaic} from '../../../src/Mosaic.sol';

contract MosaicMintTest is PRBTest, StdCheats, TestHelpers {
  Mosaic internal mosaic;
  uint256 private constant price = 0.025 ether;

  /// @dev A function invoked before each test_ case is run.
  function setUp() public virtual {
    // Instantiate the contract-under-test.
    mosaic = new Mosaic(address(this), 'https://google.com/');
  }

  function test_shouldRevertIfRecipientAddressIsInvalid() public {
    // Arrange
    address recipient = address(0);

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(Mosaic.ZeroAddress.selector));
    mosaic.mint(recipient, 1);
  }

  function test_shouldMintSpecifiedAmountOfTokensByAdmin() public {
    // Arrange
    address recipient = address(0x123);
    uint8 amountToMint = 5;

    // Act
    vm.prank(address(this));
    mosaic.mint{value: price * amountToMint}(recipient, amountToMint);

    // Assert
    for (uint i = 1; i < amountToMint + 1; i++) {
      assertEq(mosaic.ownerOf(i), recipient, 'Incorrect token owner');
    }
  }

  function test_shouldPayToMint() public {
    // Arrange
    address recipient = address(0x123);

    // Act
    vm.prank(address(this));
    vm.expectRevert(abi.encodeWithSelector(Mosaic.InsufficientFunds.selector));
    mosaic.mint{value: 0}(recipient, 1);
  }

  function test_shouldRevertIfMaxSupplyIsExceeded() public {
    // Arrange
    address recipient = address(0x123);
    uint256 amountToMint = 510;

    // Act and Assert
    for (uint i = 0; i < amountToMint; i++) {
      vm.prank(address(this));
      mosaic.mint{value: price}(recipient, 1);
    }

    vm.expectRevert(abi.encodeWithSelector(Mosaic.MaxSupplyExceeded.selector));
    mosaic.mint{value: price}(recipient, 1);
  }

  function test_shouldRevertIfMaxNumberPerMintIsExceeded() public {
    // Arrange
    address recipient = address(0x123);
    uint8 amountToMint = 11;

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(Mosaic.MaxNumberOfMintedTokensExceeded.selector));
    mosaic.mint{value: price}(recipient, amountToMint);
  }

  function test_mintAndWithdraw() public {
    // Arrange
    address recipient = address(0x123);
    address newFundsReceiverAddress = address(0x456);
    uint8 amountToMint = 4;

    vm.prank(address(this));
    mosaic.setFundsReceiverAddress(newFundsReceiverAddress);
    mosaic.mint{value: price * amountToMint}(recipient, amountToMint);

    // Assert
    uint256 balanceBefore = address(newFundsReceiverAddress).balance;
    mosaic.withdraw();
    assertEq(address(newFundsReceiverAddress).balance, balanceBefore + 0.1 ether, 'Balance should before + 1 ether');
  }

  function test_ownerMint() public {
    // Arrange
    address recipient = address(0x123);
    uint8 amountToMint = 5;

    // Act
    vm.prank(address(this));
    mosaic.ownerMint(recipient, amountToMint);

    // Assert
    for (uint i = 1; i < amountToMint + 1; i++) {
      assertEq(mosaic.ownerOf(i), recipient, 'Incorrect token owner');
    }
  }

  function test_onlyOwnerCanOwnerMint() public {
    // Arrange
    address caller = address(0x123);
    vm.prank(caller);

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(Mosaic.OnlyOwner.selector));
    mosaic.ownerMint(caller, 1);
  }
}
