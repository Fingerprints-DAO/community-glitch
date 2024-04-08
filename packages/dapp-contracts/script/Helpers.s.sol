// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {PRBTest} from '@prb/test/src/PRBTest.sol';
import {Glitch, TokenVersion} from '../src/Glitch.sol';
import {GlitchAuction} from '../src/GlitchAuction.sol';

contract Helpers {
  function tokenVersionToString(TokenVersion version) public pure returns (string memory) {
    return string(abi.encodePacked(version));
  }
}

contract TestHelpers is PRBTest {
  function fillTopBids(GlitchAuction auction) internal {
    address[10] memory addresses = [
      vm.addr(42),
      vm.addr(43),
      vm.addr(44),
      vm.addr(45),
      vm.addr(46),
      vm.addr(47),
      vm.addr(48),
      vm.addr(49),
      vm.addr(50),
      vm.addr(20)
    ];
    uint64[10] memory bidAmounts = [
      10.9 ether, // 1st highest bid
      0.7 ether, // 11th highest bid
      1.9 ether, // 5th highest bid
      0.9 ether,
      10.8 ether, // 2nd highest bid
      1.8 ether,
      0.8 ether, // 10th highest bid
      10.7 ether, // 3rd highest bid
      1.7 ether, // 6th highest bid
      10.6 ether
    ];
    // Act
    for (uint256 i = 0; i < addresses.length; i++) {
      vm.startPrank(addresses[i]);
      vm.deal(addresses[i], 100 ether);
      auction.bid{value: bidAmounts[i]}(bidAmounts[i], new bytes32[](1));
      vm.stopPrank();
    }
  }
}
