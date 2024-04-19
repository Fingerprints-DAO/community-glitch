// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {BaseScript} from './Base.s.sol';
import {Mosaic} from '../src/Mosaic.sol';

contract SetMerkleRootMosaic is BaseScript {
  function run() external {
    address mosaicAddress = vm.envAddress('MOSAIC_ADDRESS');
    bytes32 freeClaimAllowlistRoot = vm.envBytes32('FREE_CLAIM_ALLOWLIST_ROOT');
    bytes32 discountAllowlistRoot = vm.envBytes32('DISCOUNT_ALLOWLIST_ROOT');

    Mosaic mosaic = Mosaic(mosaicAddress);

    vm.startBroadcast(broadcaster);
    mosaic.setFreeClaimAllowlistRoot(freeClaimAllowlistRoot);
    mosaic.setDiscountAllowlistRoot(discountAllowlistRoot);
    vm.stopBroadcast();
  }
}
