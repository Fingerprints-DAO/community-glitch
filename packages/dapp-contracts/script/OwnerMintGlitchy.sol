// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {BaseScript} from './Base.s.sol';
import {Merkle} from 'murky-merkle/src/Merkle.sol';
import {GlitchyGridGrid} from '../src/GlitchyGridGrid.sol';

contract OwnerMintGlitchy is BaseScript {
  function run() external {
    address glitchyAddress = vm.envAddress('GLITCHY_ADDRESS');
    address recipient = vm.envAddress('TO');
    uint8 quantity = uint8(vm.envUint('QTY'));

    GlitchyGridGrid glitchy = GlitchyGridGrid(glitchyAddress);

    vm.startBroadcast(broadcaster);
    while (quantity > 0) {
      uint8 amount = quantity > 10 ? 10 : quantity;
      quantity = quantity - amount;
      glitchy.ownerMint(recipient, amount);
    }
    vm.stopBroadcast();
  }
}
