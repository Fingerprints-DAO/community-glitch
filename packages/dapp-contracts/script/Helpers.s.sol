// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;
import {Glitch, TokenVersion} from '../src/Glitch.sol';

contract Helpers {
  function tokenVersionToString(TokenVersion version) public pure returns (string memory) {
    return string(abi.encodePacked(version));
  }
}
