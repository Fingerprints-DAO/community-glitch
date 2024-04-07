// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20 <0.9.0;

import {GlitchAuction} from '../src/GlitchAuction.sol';

import {BaseScript} from './Base.s.sol';
import {console2} from 'forge-std/src/console2.sol';
import {VmSafe} from 'forge-std/src/Vm.sol';

/// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract ClaimAll is BaseScript {
  function run() public {
    _claim();
  }

  function _claim() internal {
    address auctionAddress = vm.envOr({name: 'AUCTION_ADDRESS', defaultValue: address(0)});
    uint256 qty = vm.envOr({name: 'QTY', defaultValue: uint256(0)});
    console2.log('config', GlitchAuction(auctionAddress).getConfig().endTime);
    console2.log('timestamp', block.timestamp);
    console2.log('auctionAddress', auctionAddress);
    console2.log('qty', qty);
    for (uint256 i = 0; i < qty; i++) {
      VmSafe.Wallet memory user = vm.createWallet(i + 10);
      vm.startBroadcast(user.privateKey);
      GlitchAuction(auctionAddress).claimAll(user.addr);
      vm.stopBroadcast();
    }
  }
}
