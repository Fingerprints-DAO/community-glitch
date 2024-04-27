// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.23;

import {console2} from 'forge-std/src/console2.sol';
import {Merkle} from 'murky-merkle/src/Merkle.sol';
import {GlitchyGridGrid} from '../../../src/GlitchyGridGrid.sol';
import {PRBTest} from '@prb/test/src/PRBTest.sol';
import {StdCheats} from 'forge-std/src/StdCheats.sol';
import {stdError} from 'forge-std/src/stdError.sol';
import {TestHelpers} from '../../../script/Helpers.s.sol';

contract GlitchyGridGridMintTest is PRBTest, StdCheats, TestHelpers {
  GlitchyGridGrid internal glitchy;
  address internal alice = vm.addr(3);
  address internal bob = vm.addr(4);
  uint256 private constant price = 0.025 ether;
  bytes32[] private emptyProof = new bytes32[](2);

  function setUp() public virtual {
    uint256 _startTime = block.timestamp - 1000;
    uint256 _endTime = block.timestamp + 1000;
    glitchy = new GlitchyGridGrid(address(this), 'https://google.com/', address(this));
    glitchy.setConfig(_startTime, _endTime);
  }

  function test_shouldNotMintIfInvalidTimeNotStarted() public {
    // Arrange
    uint256 _startTime = block.timestamp + 10000;
    uint256 _endTime = block.timestamp + 100000;
    glitchy.setConfig(_startTime, _endTime);

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(GlitchyGridGrid.InvalidStartEndTime.selector, _startTime, _endTime));
    glitchy.mint{value: price}(address(0x123), 1, emptyProof);
  }

  function test_shouldNotMintIfInvalidTimeEnded() public {
    // Arrange
    uint256 _startTime = block.timestamp - 10000;
    uint256 _endTime = block.timestamp - 1000;
    glitchy.setConfig(_startTime, _endTime);

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(GlitchyGridGrid.InvalidStartEndTime.selector, _startTime, _endTime));
    glitchy.mint{value: price}(address(0x123), 1, emptyProof);
  }

  function test_shouldRevertIfRecipientAddressIsInvalid() public {
    // Arrange
    address recipient = address(0);

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(GlitchyGridGrid.ZeroAddress.selector));
    glitchy.mint{value: price}(recipient, 1, emptyProof);
  }

  function test_shouldMintSpecifiedAmountOfTokensByAdmin() public {
    // Arrange
    address recipient = address(0x123);
    uint8 amountToMint = 5;

    // Act
    vm.prank(address(this));
    glitchy.mint{value: price * amountToMint}(recipient, amountToMint, emptyProof);

    // Assert
    for (uint i = 1; i < amountToMint + 1; i++) {
      assertEq(glitchy.ownerOf(i), recipient, 'Incorrect token owner');
    }
  }

  function test_shouldPayToMint() public {
    // Arrange
    address recipient = address(0x123);

    // Act
    vm.prank(address(this));
    vm.expectRevert(abi.encodeWithSelector(GlitchyGridGrid.InsufficientFunds.selector));
    glitchy.mint{value: 0}(recipient, 1, emptyProof);
  }

  function test_shouldRevertIfMaxSupplyIsExceeded() public {
    // Arrange
    address recipient = address(0x123);
    uint16 amountToMint = glitchy.MAX_SUPPLY() - glitchy.FREE_CLAIM_AMOUNT();
    Merkle m = new Merkle();
    bytes32[] memory data = new bytes32[](2);
    data[0] = keccak256(bytes.concat(keccak256(abi.encode(alice, glitchy.FREE_CLAIM_AMOUNT()))));
    data[1] = keccak256(bytes.concat(keccak256(abi.encode(bob, glitchy.FREE_CLAIM_AMOUNT()))));

    bytes32 root = m.getRoot(data);

    // Act
    vm.prank(address(this));
    glitchy.setFreeClaimAllowlistRoot(root);
    bytes32[] memory proof = m.getProof(data, 0); // will get proof for 0x2 value

    // Act and Assert
    for (uint i = 0; i < amountToMint; i++) {
      vm.prank(address(this));
      glitchy.mint{value: price}(recipient, 1, emptyProof);
    }

    // Act and Assert
    vm.prank(alice);
    glitchy.claim(alice, glitchy.FREE_CLAIM_AMOUNT(), proof);

    vm.expectRevert(abi.encodeWithSelector(GlitchyGridGrid.RegularMintedExceeded.selector));
    glitchy.mint{value: price}(recipient, 1, emptyProof);
  }

  function test_shouldRevertIfFreeClaimedExceeded() public {
    // Arrange
    uint8 amountToMint = glitchy.FREE_CLAIM_AMOUNT();
    Merkle m = new Merkle();
    bytes32[] memory data = new bytes32[](2);
    data[0] = keccak256(bytes.concat(keccak256(abi.encode(alice, amountToMint))));
    data[1] = keccak256(bytes.concat(keccak256(abi.encode(bob, amountToMint))));

    bytes32 root = m.getRoot(data);

    // Act
    vm.prank(address(this));
    glitchy.setFreeClaimAllowlistRoot(root);
    bytes32[] memory proof = m.getProof(data, 0); // will get proof for 0x2 value

    // Act and Assert
    vm.prank(alice);
    glitchy.claim(alice, amountToMint, proof);

    vm.expectRevert(abi.encodeWithSelector(GlitchyGridGrid.FreeClaimedExceeded.selector));
    glitchy.claim(alice, 1, proof);
  }

  function test_shouldRevertIfMaxSupplyExceeded() public {
    uint16 amountToMint = glitchy.MAX_SUPPLY();
    address recipient = address(0x123);

    for (uint i = 0; i < amountToMint; i++) {
      vm.prank(address(this));
      glitchy.ownerMint(recipient, 1);
    }

    vm.expectRevert(abi.encodeWithSelector(GlitchyGridGrid.MaxSupplyExceeded.selector));
    glitchy.ownerMint(recipient, 1);
  }

  function test_shouldRevertIfMaxSupplyIsExceedRegresion() public {
    // Arrange
    address recipient = address(0x123);
    uint16 amountToMint = glitchy.MAX_SUPPLY() - glitchy.FREE_CLAIM_AMOUNT() - 2;

    for (uint i = 0; i < amountToMint; i++) {
      vm.prank(address(this));
      glitchy.mint{value: price}(recipient, 1, emptyProof);
    }

    vm.expectRevert(abi.encodeWithSelector(GlitchyGridGrid.RegularMintedExceeded.selector));
    glitchy.mint{value: price * 8}(recipient, 8, emptyProof);
  }

  function test_shouldRevertIfMaxNumberPerMintIsExceeded() public {
    // Arrange
    address recipient = address(0x123);
    uint8 amountToMint = 11;

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(GlitchyGridGrid.MaxNumberOfMintedTokensExceeded.selector));
    glitchy.mint{value: price * amountToMint}(recipient, amountToMint, emptyProof);
  }

  function test_mintAndWithdraw() public {
    // Arrange
    address recipient = address(0x123);
    address newFundsReceiverAddress = address(0x456);
    uint8 amountToMint = 4;

    vm.prank(address(this));
    glitchy.setFundsReceiverAddress(newFundsReceiverAddress);
    glitchy.mint{value: price * amountToMint}(recipient, amountToMint, emptyProof);

    // Assert
    uint256 balanceBefore = address(newFundsReceiverAddress).balance;
    glitchy.withdraw();
    assertEq(address(newFundsReceiverAddress).balance, balanceBefore + 0.1 ether, 'Balance should before + 1 ether');
  }

  function test_ownerMint() public {
    // Arrange
    address recipient = address(0x123);
    uint8 amountToMint = 5;

    // Act
    vm.prank(address(this));
    glitchy.ownerMint(recipient, amountToMint);

    // Assert
    for (uint i = 1; i < amountToMint + 1; i++) {
      assertEq(glitchy.ownerOf(i), recipient, 'Incorrect token owner');
    }
  }

  function test_onlyOwnerCanOwnerMint() public {
    // Arrange
    address caller = address(0x123);
    vm.prank(caller);

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(GlitchyGridGrid.OnlyOwner.selector));
    glitchy.ownerMint(caller, 1);
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
    glitchy.setFreeClaimAllowlistRoot(root);
    bytes32[] memory proof = m.getProof(data, 0); // will get proof for 0x2 value

    vm.deal(alice, 100 ether);
    vm.prank(alice);
    glitchy.claim(alice, amountToMint, proof);

    // Assert
    for (uint i = 1; i < amountToMint + 1; i++) {
      assertEq(glitchy.ownerOf(i), alice, 'Incorrect token owner');
    }
  }

  function test_cannotReuseProof() public {
    // Arrange
    uint8 amountToMint = 1;

    // Create merkle root and set it
    Merkle m = new Merkle();
    bytes32[] memory data = new bytes32[](2);
    data[0] = keccak256(bytes.concat(keccak256(abi.encode(alice, amountToMint))));
    data[1] = keccak256(bytes.concat(keccak256(abi.encode(bob, amountToMint))));
    bytes32 root = m.getRoot(data);

    // Act
    glitchy.setFreeClaimAllowlistRoot(root);
    vm.prank(address(this));
    bytes32[] memory proof = m.getProof(data, 0); // will get proof for 0x2 value

    vm.prank(alice);
    glitchy.claim(alice, amountToMint, proof);

    // Assert
    for (uint i = 1; i < amountToMint + 1; i++) {
      assertEq(glitchy.ownerOf(i), alice, 'Incorrect token owner');
    }

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(GlitchyGridGrid.InvalidProof.selector));
    glitchy.claim(bob, amountToMint, proof);
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
    glitchy.setFreeClaimAllowlistRoot(root);

    bytes32[] memory fakeData = new bytes32[](2);
    data[0] = keccak256(abi.encodePacked(address(this)));
    data[1] = keccak256(abi.encodePacked(bob));
    bytes32[] memory proof = m.getProof(fakeData, 0); // will get proof for 0x2 value

    // Act and Assert
    vm.expectRevert(abi.encodeWithSelector(GlitchyGridGrid.InvalidProof.selector));
    glitchy.claim(bob, amountToMint, proof);
  }

  function test_discoutedMint() public {
    // Arrange
    uint8 amountToMint = 5;

    // Create merkle root and set it
    Merkle m = new Merkle();
    bytes32[] memory data = new bytes32[](2);
    data[0] = keccak256(abi.encodePacked(alice));
    data[1] = keccak256(abi.encodePacked(bob));
    bytes32 root = m.getRoot(data);

    // Act
    vm.prank(address(this));
    glitchy.setDiscountAllowlistRoot(root);
    bytes32[] memory proof = m.getProof(data, 0);

    uint256 value = ((price * amountToMint) * (100 - glitchy.DISCOUNT_PERCENTAGE())) / 100;
    vm.deal(alice, 100 ether);
    vm.prank(alice);
    glitchy.mint{value: value}(alice, amountToMint, proof);

    // Assert
    for (uint i = 1; i < amountToMint + 1; i++) {
      assertEq(glitchy.ownerOf(i), alice, 'Incorrect token owner');
    }
  }
}
