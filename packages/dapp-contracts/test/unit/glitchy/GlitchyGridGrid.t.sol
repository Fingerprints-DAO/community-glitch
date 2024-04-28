// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {PRBTest} from '@prb/test/src/PRBTest.sol';
import {console2} from 'forge-std/src/console2.sol';
import {StdCheats} from 'forge-std/src/StdCheats.sol';
import {stdError} from 'forge-std/src/stdError.sol';
import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {IERC721Errors} from '@openzeppelin/contracts/interfaces/draft-IERC6093.sol';

import {GlitchyGridGrid} from '../../../src/GlitchyGridGrid.sol';

contract GlitchyGridGridTest is PRBTest, StdCheats {
  GlitchyGridGrid internal glitchy;
  bytes32[] private emptyProof = new bytes32[](2);

  function setUp() public virtual {
    uint256 _startTime = block.timestamp - 1000;
    uint256 _endTime = block.timestamp + 1000;
    glitchy = new GlitchyGridGrid(address(this), 'https://google.com/', address(this));
    glitchy.setConfig(_startTime, _endTime);
  }

  // DEPLOY
  function test_deployWithInitialOwner() public {
    address initialOwner = address(0x123);
    GlitchyGridGrid newGlitchyGridGrid = new GlitchyGridGrid(initialOwner, 'https://google.com/', address(this));
    assertEq(newGlitchyGridGrid.owner(), initialOwner, 'Incorrect initial owner');
  }

  // token uri
  function test_tokenUriNonexistentTokenId() public {
    // Arrange
    uint256 tokenId = 1;

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(IERC721Errors.ERC721NonexistentToken.selector, 1));
    glitchy.tokenURI(tokenId);
  }

  function test_baseUriValueCanBeSet() public {
    // Arrange
    string memory baseURI = 'http://example.com/';

    // Act
    glitchy.mint{value: 0.025 ether}(msg.sender, 1, emptyProof);
    glitchy.setBaseURI(baseURI);

    // assert if tokenURI containes baseURI
    string memory tokenURI = glitchy.tokenURI(1);
    assertEq(tokenURI, string(abi.encodePacked(baseURI, '1')), 'Token URI does not contain base URI');
  }

  function test_setZeroFundReceiver() public {
    // Arrange
    address zeroAddress = address(0);

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(GlitchyGridGrid.ZeroAddress.selector));
    glitchy.setFundsReceiverAddress(zeroAddress);
  }

  function test_setTokenPrice() public {
    // Arrange
    uint256 newTokenPrice = 0.1 ether;

    // Act
    glitchy.setTokenPrice(newTokenPrice);

    // Assert
    assertEq(glitchy.tokenPrice(), newTokenPrice, 'Token price not set');
  }

  function test_setConfig() public {
    // Arrange
    uint256 startTime = block.timestamp;
    uint256 endTime = startTime + 100;

    // Act
    glitchy.setConfig(startTime, endTime);
  }

  function test_invalidConfig() public {
    // Arrange
    uint256 startTime = 0;
    uint256 endTime = 100;

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(GlitchyGridGrid.InvalidStartEndTime.selector, startTime, endTime));
    glitchy.setConfig(startTime, endTime);

    // Arrange
    uint256 startTime2 = 1;
    uint256 endTime2 = 0;

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(GlitchyGridGrid.InvalidStartEndTime.selector, startTime2, endTime2));
    glitchy.setConfig(startTime2, endTime2);
  }
}
