// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {PRBTest} from '@prb/test/src/PRBTest.sol';
import {console2} from 'forge-std/src/console2.sol';
import {StdCheats} from 'forge-std/src/StdCheats.sol';
import {stdError} from 'forge-std/src/stdError.sol';
import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {IERC721Errors} from '@openzeppelin/contracts/interfaces/draft-IERC6093.sol';

import {Glitch} from '../../../src/Glitch.sol';
import {Helpers} from '../../../script/Helpers.s.sol';

/// @dev If this is your first time with Forge, read this tutorial in the Foundry Book:
/// https://book.getfoundry.sh/forge/writing-tests
contract GlitchTokenVersionTest is PRBTest, StdCheats, Helpers {
  Glitch internal glitch;
  address internal owner = address(123);

  /// @dev A function invoked before each test_ case is run.
  function setUp() public virtual {
    // Instantiate the contract-under-test.
    vm.deal(owner, 100 ether);
    glitch = new Glitch(owner, owner, 'https://google.com/');
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
    vm.prank(owner);
    glitch.mint(recipient, tokenId);

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
    vm.prank(owner);
    glitch.mint(recipient, tokenId);

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
    address initialOwner = owner;

    vm.prank(owner);
    glitch.mint(initialOwner, tokenId);

    vm.prank(initialOwner);
    glitch.transferFrom(initialOwner, recipient, tokenId);

    address newOwner = glitch.ownerOf(tokenId);
    assertEq(newOwner, recipient, 'Token ownership not transferred correctly');
  }

  function test_allTokenVersionsCanBeRetrieved() public {
    // Arrange
    vm.startPrank(owner);
    glitch.mint(owner, 1);
    glitch.mint(owner, 2);
    glitch.mint(owner, 3);

    // Act
    glitch.transferFrom(owner, address(0x1234567890), 1);
    vm.stopPrank();
    string[] memory versions = glitch.getAllTokensVersion();

    // Assert
    assertEq(versions.length, 50, 'Incorrect number of token versions');
    assertEq(versions[0], 'B', 'Incorrect token version at index 0');
    assertEq(versions[1], 'A', 'Incorrect token version at index 1');
    assertEq(versions[2], 'A', 'Incorrect token version at index 2');
    assertEq(versions[10], 'A', 'Incorrect token version at index 2');
    assertEq(versions[49], 'A', 'Incorrect token version at index 2');
  }

  // Refresh a token version
  function test_refreshTokenVersionTest() public {
    // Mint a token
    uint256 tokenId = 1;
    address recipient = address(0x1234567890);
    string memory initialVersion;

    // Act
    vm.startPrank(owner);
    glitch.mint(owner, tokenId);
    // Get the initial token version
    initialVersion = glitch.getTokenVersion(tokenId);

    glitch.transferFrom(owner, recipient, tokenId);

    glitch.setFundsReceiverAddress(recipient);

    // Refresh the token version
    glitch.refreshToken{value: glitch.refreshTokenPrice()}(tokenId);
    vm.stopPrank();

    // Assert that the token version has been refreshed
    assertNotEq(initialVersion, tokenVersionToString(Glitch.TokenVersion.A), 'Token version not refreshed to A');
  }
  function test_refreshTokenVersionAndReceiverGetsTheAmountPaid() public {
    // Mint a token
    uint256 tokenId = 1;
    address recipient = address(0x1234567890);
    uint256 refreshTokenPrice = glitch.refreshTokenPrice();
    uint256 recipientBalance;

    // Act
    vm.startPrank(owner);
    glitch.mint(owner, tokenId);

    glitch.transferFrom(owner, recipient, tokenId);
    glitch.setFundsReceiverAddress(recipient);
    recipientBalance = recipient.balance;

    // Refresh the token version
    glitch.refreshToken{value: glitch.refreshTokenPrice()}(tokenId);
    vm.stopPrank();

    // Assert that the token version has been refreshed
    assertEq(recipient.balance, recipientBalance + refreshTokenPrice, 'Incorrect amount received');
  }
  function test_tokenVersionCannotBeUpdatedBeyondVersionD() public {
    // Arrange
    address recipient = address(0x1234567890);
    address bob = address(0x123456789123);
    address marcia = address(0x9871234567890);
    uint256 tokenId = 1;

    // Act
    vm.prank(owner);
    glitch.mint(recipient, tokenId);
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
}
