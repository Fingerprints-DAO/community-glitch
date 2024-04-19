// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {console2} from 'forge-std/src/console2.sol';
import {Merkle} from 'murky-merkle/src/Merkle.sol';
import {Mosaic} from '../../../src/Mosaic.sol';
import {PRBTest} from '@prb/test/src/PRBTest.sol';
import {StdCheats} from 'forge-std/src/StdCheats.sol';
import {stdError} from 'forge-std/src/stdError.sol';
import {TestHelpers} from '../../../script/Helpers.s.sol';

contract MosaicMintTest is PRBTest, StdCheats, TestHelpers {
  Mosaic internal mosaic;
  address internal alice = vm.addr(3);
  address internal bob = vm.addr(4);
  uint256 private constant price = 0.025 ether;
  bytes32[] private emptyProof = new bytes32[](2);

  function setUp() public virtual {
    uint256 _startTime = block.timestamp - 1000;
    uint256 _endTime = block.timestamp + 1000;
    mosaic = new Mosaic(address(this), 'https://google.com/');
    mosaic.setConfig(_startTime, _endTime);
  }

  function test_shouldNotMintIfInvalidTimeNotStarted() public {
    // Arrange
    uint256 _startTime = block.timestamp + 10000;
    uint256 _endTime = block.timestamp + 100000;
    mosaic.setConfig(_startTime, _endTime);

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(Mosaic.InvalidStartEndTime.selector, _startTime, _endTime));
    mosaic.mint{value: price}(address(0x123), 1, emptyProof);
  }

  function test_shouldNotMintIfInvalidTimeEnded() public {
    // Arrange
    uint256 _startTime = block.timestamp - 10000;
    uint256 _endTime = block.timestamp - 1000;
    mosaic.setConfig(_startTime, _endTime);

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(Mosaic.InvalidStartEndTime.selector, _startTime, _endTime));
    mosaic.mint{value: price}(address(0x123), 1, emptyProof);
  }

  function test_shouldRevertIfRecipientAddressIsInvalid() public {
    // Arrange
    address recipient = address(0);

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(Mosaic.ZeroAddress.selector));
    mosaic.mint{value: price}(recipient, 1, emptyProof);
  }

  function test_shouldMintSpecifiedAmountOfTokensByAdmin() public {
    // Arrange
    address recipient = address(0x123);
    uint8 amountToMint = 5;

    // Act
    vm.prank(address(this));
    mosaic.mint{value: price * amountToMint}(recipient, amountToMint, emptyProof);

    // Assert
    for (uint i = 1; i < amountToMint + 1; i++) {
      assertEq(mosaic.ownerOf(i), recipient, 'Incorrect token owner');
    }
  }

  function test_shouldPayToMint() public {
    // Arrange
    address recipient = address(0x123);

    // Act
    vm.prank(address(this));
    vm.expectRevert(abi.encodeWithSelector(Mosaic.InsufficientFunds.selector));
    mosaic.mint{value: 0}(recipient, 1, emptyProof);
  }

  function test_shouldRevertIfMaxSupplyIsExceeded() public {
    // Arrange
    address recipient = address(0x123);
    uint256 amountToMint = 510;

    // Act and Assert
    for (uint i = 0; i < amountToMint; i++) {
      vm.prank(address(this));
      mosaic.mint{value: price}(recipient, 1, emptyProof);
    }

    vm.expectRevert(abi.encodeWithSelector(Mosaic.MaxSupplyExceeded.selector));
    mosaic.mint{value: price}(recipient, 1, emptyProof);
  }

  function test_shouldRevertIfMaxNumberPerMintIsExceeded() public {
    // Arrange
    address recipient = address(0x123);
    uint8 amountToMint = 11;

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(Mosaic.MaxNumberOfMintedTokensExceeded.selector));
    mosaic.mint{value: price * amountToMint}(recipient, amountToMint, emptyProof);
  }

  function test_mintAndWithdraw() public {
    // Arrange
    address recipient = address(0x123);
    address newFundsReceiverAddress = address(0x456);
    uint8 amountToMint = 4;

    vm.prank(address(this));
    mosaic.setFundsReceiverAddress(newFundsReceiverAddress);
    mosaic.mint{value: price * amountToMint}(recipient, amountToMint, emptyProof);

    // Assert
    uint256 balanceBefore = address(newFundsReceiverAddress).balance;
    mosaic.withdraw();
    assertEq(address(newFundsReceiverAddress).balance, balanceBefore + 0.1 ether, 'Balance should before + 1 ether');
  }

  function test_ownerMint() public {
    // Arrange
    address recipient = address(0x123);
    uint8 amountToMint = 5;

    // Act
    vm.prank(address(this));
    mosaic.ownerMint(recipient, amountToMint);

    // Assert
    for (uint i = 1; i < amountToMint + 1; i++) {
      assertEq(mosaic.ownerOf(i), recipient, 'Incorrect token owner');
    }
  }

  function test_onlyOwnerCanOwnerMint() public {
    // Arrange
    address caller = address(0x123);
    vm.prank(caller);

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(Mosaic.OnlyOwner.selector));
    mosaic.ownerMint(caller, 1);
  }

  function test_claimAllowlisted() public {
    // Arrange
    uint8 amountToMint = 5;

    // Create merkle root and set it
    Merkle m = new Merkle();
    bytes32[] memory data = new bytes32[](2);
    data[0] = keccak256(bytes.concat(keccak256(abi.encode(alice, amountToMint))));
    data[1] = keccak256(bytes.concat(keccak256(abi.encode(bob, amountToMint))));

    bytes32 root = m.getRoot(data);

    // Act
    vm.prank(address(this));
    mosaic.setFreeClaimAllowlistRoot(root);
    bytes32[] memory proof = m.getProof(data, 0); // will get proof for 0x2 value

    vm.deal(alice, 100 ether);
    vm.prank(alice);
    mosaic.claim(proof, alice, amountToMint);

    // Assert
    for (uint i = 1; i < amountToMint + 1; i++) {
      assertEq(mosaic.ownerOf(i), alice, 'Incorrect token owner');
    }
  }

  function test_cannotReuseProof() public {
    // Arrange
    uint8 amountToMint = 5;

    // Create merkle root and set it
    Merkle m = new Merkle();
    bytes32[] memory data = new bytes32[](2);
    data[0] = keccak256(bytes.concat(keccak256(abi.encode(alice, amountToMint))));
    data[1] = keccak256(bytes.concat(keccak256(abi.encode(bob, amountToMint))));
    bytes32 root = m.getRoot(data);

    // Act
    mosaic.setFreeClaimAllowlistRoot(root);
    vm.prank(address(this));
    bytes32[] memory proof = m.getProof(data, 0); // will get proof for 0x2 value

    vm.prank(alice);
    mosaic.claim(proof, alice, amountToMint);

    // Assert
    for (uint i = 1; i < amountToMint + 1; i++) {
      assertEq(mosaic.ownerOf(i), alice, 'Incorrect token owner');
    }

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(Mosaic.InvalidProof.selector));
    mosaic.claim(proof, bob, amountToMint);
  }

  function test_cannotClaimWithInvalidProof() public {
    // Arrange
    uint8 amountToMint = 5;

    // Create merkle root and set it
    Merkle m = new Merkle();
    bytes32[] memory data = new bytes32[](2);
    data[0] = keccak256(bytes.concat(keccak256(abi.encode(alice, amountToMint))));
    data[1] = keccak256(bytes.concat(keccak256(abi.encode(bob, amountToMint))));
    bytes32 root = m.getRoot(data);

    // Act
    vm.prank(address(this));
    mosaic.setFreeClaimAllowlistRoot(root);

    bytes32[] memory fakeData = new bytes32[](2);
    data[0] = keccak256(abi.encodePacked(address(this)));
    data[1] = keccak256(abi.encodePacked(bob));
    bytes32[] memory proof = m.getProof(fakeData, 0); // will get proof for 0x2 value

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(Mosaic.InvalidProof.selector));
    mosaic.claim(proof, bob, amountToMint);
  }

  function test_discoutedMint() public {
    // Arrange
    uint8 amountToMint = 5;

    // Create merkle root and set it
    Merkle m = new Merkle();
    bytes32[] memory data = new bytes32[](2);
    data[0] = keccak256(bytes.concat(keccak256(abi.encode(alice))));
    data[1] = keccak256(bytes.concat(keccak256(abi.encode(bob))));
    bytes32 root = m.getRoot(data);

    // Act
    vm.prank(address(this));
    mosaic.setDiscountAllowlistRoot(root);
    bytes32[] memory proof = m.getProof(data, 0);

    uint256 value = ((price * amountToMint) * (100 - mosaic.DISCOUNT_PERCENTAGE())) / 100;
    vm.deal(alice, 100 ether);
    vm.prank(alice);
    mosaic.mint{value: value}(alice, amountToMint, proof);

    // Assert
    for (uint i = 1; i < amountToMint + 1; i++) {
      assertEq(mosaic.ownerOf(i), alice, 'Incorrect token owner');
    }
  }
}
