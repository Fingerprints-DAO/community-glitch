// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20 <0.9.0;

import {PRBTest} from '@prb/test/src/PRBTest.sol';
import {console2} from 'forge-std/src/console2.sol';
import {StdCheats} from 'forge-std/src/StdCheats.sol';
import {stdError} from 'forge-std/src/stdError.sol';
import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {IERC721Errors} from '@openzeppelin/contracts/interfaces/draft-IERC6093.sol';

import {Glitch, TokenVersion} from '../../../src/Glitch.sol';

contract GlitchTest is PRBTest, StdCheats {
  Glitch internal glitch;

  /// @dev A function invoked before each test_ case is run.
  function setUp() public virtual {
    // Instantiate the contract-under-test.
    glitch = new Glitch(address(this), address(this), 'https://google.com/');
  }
  function tokenVersionToString(TokenVersion version) public pure returns (string memory) {
    return string(abi.encodePacked(version));
  }

  // DEPLOY
  function test_deployWithInitialOwner() public {
    address initialOwner = address(0x123);
    Glitch newGlitch = new Glitch(initialOwner, address(this), 'https://google.com/');
    assertEq(newGlitch.owner(), initialOwner, 'Incorrect initial owner');
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
    glitch.mint(msg.sender, 1);
    glitch.setBaseURI(baseURI);

    // Assert
    assertEq(glitch.baseURI(), baseURI, 'Base URI not set correctly');

    // assert if tokenURI containes baseURI
    string memory tokenURI = glitch.tokenURI(1);
    assertEq(tokenURI, string(abi.encodePacked(baseURI, 'A/1')), 'Token URI does not contain base URI');
  }
}
