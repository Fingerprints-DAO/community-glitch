// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

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
    glitch = new Glitch(address(this));
  }

  // MINT
  function test_shouldRevertIfNonOwnerAndNonMinterContractMintsToken() public {
    // Arrange
    address recipient = address(0x123);
    address nonOwnerNonMinter = address(0x456);

    // Act and Assert
    vm.prank(nonOwnerNonMinter);
    try glitch.mint(recipient) {
      fail("Expected to revert with 'Only minter contract and owner'");
    } catch Error(string memory reason) {
      assertEq(reason, 'Only minter contract and owner');
    } catch (bytes memory) {
      fail('Unexpected error type');
    }
  }
  function test_shouldSuccessfullyMintTokenAndIncrementNextTokenId() public {
    // Arrange
    address recipient = address(0x123);
    uint256 initialNextTokenId = glitch.totalSupply();

    // Act
    glitch.mint(recipient);

    // Assert
    assertEq(glitch.totalSupply(), initialNextTokenId + 1, 'Next token ID not incremented');
    vm.expectRevert(abi.encodeWithSelector(IERC721Errors.ERC721NonexistentToken.selector, initialNextTokenId + 1));
    glitch.ownerOf(initialNextTokenId + 1);
  }
  function test_shouldAllowMinterContractToMintAToken() public {
    // Arrange
    address recipient = address(0x123);
    address minterContract = address(0x789);
    uint256 initialNextTokenId = glitch.totalSupply();

    // Act
    glitch.setMinterContractAddress(minterContract);
    vm.prank(minterContract);
    glitch.mint(recipient);

    // Assert
    assertEq(glitch.totalSupply(), initialNextTokenId + 1, 'Next token ID not incremented');
    assertEq(glitch.ownerOf(1), recipient, 'Incorrect token owner');
  }
  function test_shouldRevertIfRecipientAddressIsInvalid() public {
    // Arrange
    address recipient = address(0);

    // Act and Assert
    vm.expectRevert('Cannot mint to zero address');
    glitch.mint(recipient);
  }
  function test_mintingFailsIfMaxSupplyReached() public {
    // Arrange
    address recipient = address(0x123);

    // Act
    for (uint i = 0; i < 49; i++) {
      glitch.mint(recipient);
    }

    // Act and Assert
    vm.expectRevert('Max. supply reached');
    glitch.mint(recipient);
    assertEq(glitch.totalSupply(), 50, 'Incorrect total supply');
  }
  function test_shouldMintSpecifiedAmountOfTokensByAdmin() public {
    // Arrange
    address recipient = address(0x123);
    uint256 initialNextTokenId = glitch.totalSupply();
    uint256 amountToMint = 5;

    // Act
    vm.prank(address(this));
    glitch.adminMint(recipient, amountToMint);

    // Assert
    assertEq(glitch.totalSupply(), initialNextTokenId + amountToMint, 'Next token ID not incremented');
    assertEq(glitch.ownerOf(initialNextTokenId + 1), recipient, 'Incorrect token owner');
  }
  function test_shouldRevertAdminMintIfItIsNotAdmin() public {
    // Arrange
    address recipient = address(0x123);
    uint256 amountToMint = 5;

    // Act
    vm.prank(address(0x456));

    // Assert
    vm.expectRevert('Only owner');
    glitch.adminMint(recipient, amountToMint);
  }
}
