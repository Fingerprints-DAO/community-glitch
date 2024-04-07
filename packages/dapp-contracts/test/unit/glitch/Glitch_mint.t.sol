// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20 <0.9.0;

import {PRBTest} from '@prb/test/src/PRBTest.sol';
import {console2} from 'forge-std/src/console2.sol';
import {StdCheats} from 'forge-std/src/StdCheats.sol';
import {stdError} from 'forge-std/src/stdError.sol';
import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {IERC721Errors} from '@openzeppelin/contracts/interfaces/draft-IERC6093.sol';

import {Glitch, TokenVersion} from '../../../src/Glitch.sol';

contract GlitchMintTest is PRBTest, StdCheats {
  Glitch internal glitch;

  /// @dev A function invoked before each test_ case is run.
  function setUp() public virtual {
    // Instantiate the contract-under-test.
    glitch = new Glitch(address(this), address(this), 'https://google.com/');
  }

  // MINT
  function test_shouldRevertIfOwnerTryToMint() public {
    // Arrange
    address recipient = address(0x123);
    address newMinter = address(0x456);

    // Act and Assert
    glitch.setMinterContractAddress(newMinter);

    vm.expectRevert('Only minter can mint');
    glitch.mint(recipient, 1);
  }
  function test_shouldAllowMinterContractToMintAToken() public {
    // Arrange
    address recipient = address(0x123);
    address minterContract = address(0x789);
    uint256 tokenId = 5;

    // Act
    glitch.setMinterContractAddress(minterContract);
    vm.prank(minterContract);
    glitch.mint(recipient, tokenId);

    // Assert
    assertEq(glitch.ownerOf(tokenId), recipient, 'Incorrect token owner');
  }
  function test_shouldRevertIfRecipientAddressIsInvalid() public {
    // Arrange
    address recipient = address(0);

    // Act and Assert
    vm.expectRevert('Cannot mint to zero address');
    glitch.mint(recipient, 1);
  }
  function test_mintingFailsIfNftIsMinted() public {
    // Arrange
    address alice = vm.addr(2);

    // Act
    for (uint i = 0; i < 50; i++) {
      glitch.mint(alice, i + 1);
    }

    glitch.setMinterContractAddress(alice);

    // Act and Assert
    vm.startPrank(alice);
    vm.expectRevert();
    glitch.mint(alice, 5);
    vm.stopPrank();

    assertEq(glitch.totalSupply(), 50, 'Incorrect total supply');
  }
  function test_shouldMintSpecifiedAmountOfTokensByAdmin() public {
    // Arrange
    address recipient = address(0x123);
    uint256 amountToMint = 5;
    uint256 startId = 5;

    // Act
    for (uint i = 0; i < amountToMint; i++) {
      vm.prank(address(this));
      glitch.mint(recipient, i + startId);
    }

    // Assert
    for (uint i = 0; i < amountToMint; i++) {
      assertEq(glitch.ownerOf(i + startId), recipient, 'Incorrect token owner');
    }
  }
  function test_shouldRevertAdminMintIfItIsNotAdmin() public {
    // Arrange
    address recipient = address(0x123);

    // Act
    vm.prank(address(0x456));

    // Assert
    vm.expectRevert('Only minter can mint');
    glitch.mint(recipient, 1);
  }
}
