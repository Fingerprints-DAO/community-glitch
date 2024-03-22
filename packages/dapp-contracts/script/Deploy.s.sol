// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.23 <0.9.0;

import { Glitch } from '../src/Glitch.sol';

import { BaseScript } from './Base.s.sol';

/// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract Deploy is BaseScript {
  function run(address deployer) public broadcast returns (Glitch glitch) {
    glitch = new Glitch(deployer);
  }
}
