// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import {PRBTest} from '@prb/test/src/PRBTest.sol';
import {console2} from 'forge-std/src/console2.sol';
import {StdCheats} from 'forge-std/src/StdCheats.sol';
import {stdError} from 'forge-std/src/stdError.sol';
import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {IERC721Errors} from '@openzeppelin/contracts/interfaces/draft-IERC6093.sol';

import {Glitch, TokenVersion} from '../src/Glitch.sol';

/// @dev If this is your first time with Forge, read this tutorial in the Foundry Book:
/// https://book.getfoundry.sh/forge/writing-tests
contract GlitchTest is PRBTest, StdCheats {
  Glitch internal glitch;

  /// @dev A function invoked before each test_ case is run.
  function setUp() public virtual {
    // Instantiate the contract-under-test.
    glitch = new Glitch(address(this));
  }
  function tokenVersionToString(TokenVersion version) public pure returns (string memory) {
    return string(abi.encodePacked(version));
  }

  //   DEPLOY
  function test_deployWithInitialOwner() public {
    address initialOwner = address(0x123);
    Glitch newGlitch = new Glitch(initialOwner);
    assertEq(newGlitch.owner(), initialOwner, 'Incorrect initial owner');
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

    // // Assert
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

  // TOKEN VERSION
  function test_tokenVersionNonexistentTokenId() public {
    // Arrange
    uint256 tokenId = 1;

    // Act and Assert
    assertEq(glitch.getTokenVersion(tokenId), 'A', 'Incorrect token version retrieved');
  }
  function test_tokenVersionAfterMint() public {
    // Arrange
    address recipient = address(0x1234567890);
    uint256 tokenId = 1;

    // Mint a token
    glitch.mint(recipient);

    // Act
    string memory version = glitch.getTokenVersion(tokenId);

    // Assert
    assertEq(version, 'A', 'Incorrect token version retrieved');
  }
  function test_tokenVersionAfterTransferTwice() public {
    // Arrange
    address recipient = address(0x1234567890);
    address bob = address(0x123456789123);
    address marcia = address(0x9871234567890);
    uint256 tokenId = 1;

    // Mint a token
    glitch.mint(recipient);

    // Transfer token from recipient to bob
    vm.prank(recipient);
    glitch.transferFrom(recipient, bob, tokenId);

    // Transfer token from bob to marcia
    vm.prank(bob);
    glitch.transferFrom(bob, marcia, tokenId);

    // Act
    string memory version = glitch.getTokenVersion(tokenId);

    // Assert
    assertEq(version, 'C', 'Incorrect token version retrieved');
  }

  function test_transferTokenFromOneAddressToAnother() public {
    uint256 tokenId = 1;
    address recipient = address(0x1234567890);
    address initialOwner = msg.sender;

    glitch.mint(initialOwner);

    vm.prank(initialOwner);
    glitch.transferFrom(initialOwner, recipient, tokenId);

    address newOwner = glitch.ownerOf(tokenId);
    assertEq(newOwner, recipient, 'Token ownership not transferred correctly');
  }

  function test_allTokenVersionsCanBeRetrieved() public {
    // Arrange
    glitch.mint(msg.sender);
    glitch.mint(msg.sender);
    glitch.mint(msg.sender);

    // Act
    vm.prank(msg.sender);
    glitch.transferFrom(msg.sender, address(0x1234567890), 1);
    string[] memory versions = glitch.getAllTokensVersion();

    // Assert
    assertEq(versions.length, 3, 'Incorrect number of token versions');
    assertEq(versions[0], 'B', 'Incorrect token version at index 0');
    assertEq(versions[1], 'A', 'Incorrect token version at index 1');
    assertEq(versions[2], 'A', 'Incorrect token version at index 2');
  }

  // Refresh a token version
  function test_refreshTokenVersionTest() public {
    // Mint a token
    glitch.mint(msg.sender);
    address recipient = address(0x1234567890);
    uint256 tokenId = 1;

    // Get the initial token version
    string memory initialVersion = glitch.getTokenVersion(tokenId);

    vm.prank(msg.sender);
    glitch.transferFrom(msg.sender, recipient, tokenId);
    // Refresh the token version
    glitch.refreshToken(tokenId);

    // Assert that the token version has been refreshed
    assertNotEq(initialVersion, tokenVersionToString(TokenVersion.A), 'Token version not refreshed to A');
  }
  function test_tokenVersionCannotBeUpdatedBeyondVersionD() public {
    // Arrange
    address recipient = address(0x1234567890);
    address bob = address(0x123456789123);
    address marcia = address(0x9871234567890);
    uint256 tokenId = 1;

    // Act
    glitch.mint(recipient);
    // Transfer token from recipient to bob
    vm.prank(recipient);
    glitch.transferFrom(recipient, bob, tokenId);
    // Transfer token from bob to marcia
    vm.prank(bob);
    glitch.transferFrom(bob, marcia, tokenId);
    // Transfer token from marcia to recipient
    vm.prank(marcia);
    glitch.transferFrom(marcia, recipient, tokenId);
    string memory after4thTransfer = glitch.getTokenVersion(tokenId);
    // Transfer token from recipient to bob
    vm.prank(recipient);
    glitch.transferFrom(recipient, bob, tokenId);
    string memory updatedVersion = glitch.getTokenVersion(tokenId);

    // Assert
    assertEq(updatedVersion, after4thTransfer, 'Token version should not be updated beyond version D');
  }

  // token uri
  function test_tokenUriNonexistentTokenId() public {
    // Arrange
    uint256 tokenId = 1;

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(IERC721Errors.ERC721NonexistentToken.selector, 1));
    glitch.tokenURI(tokenId);
  }

  function test_baseUriValueCanBeSet() public {
    // Arrange
    string memory baseURI = 'http://example.com/';

    // Act
    glitch.mint(msg.sender);
    glitch.setBaseURI(baseURI);

    // Assert
    assertEq(glitch.baseURI(), baseURI, 'Base URI not set correctly');

    // assert if tokenURI containes baseURI
    string memory tokenURI = glitch.tokenURI(1);
    assertEq(tokenURI, string(abi.encodePacked(baseURI, 'A/1')), 'Token URI does not contain base URI');
  }
}
