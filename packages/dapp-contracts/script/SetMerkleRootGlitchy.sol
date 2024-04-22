// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {BaseScript} from './Base.s.sol';
import {GlitchyGridGrid} from '../src/GlitchyGridGrid.sol';

contract SetMerkleRootGlitchy is BaseScript {
  function run() external {
    address glitchyAddress = vm.envAddress('GLITCHY_ADDRESS');
    bytes32 freeClaimAllowlistRoot = vm.envBytes32('FREE_CLAIM_ALLOWLIST_ROOT');
    bytes32 discountAllowlistRoot = vm.envBytes32('DISCOUNT_ALLOWLIST_ROOT');

    GlitchyGridGrid glitchy = GlitchyGridGrid(glitchyAddress);

    vm.startBroadcast(broadcaster);
    glitchy.setFreeClaimAllowlistRoot(freeClaimAllowlistRoot);
    glitchy.setDiscountAllowlistRoot(discountAllowlistRoot);
    vm.stopBroadcast();
  }
}
