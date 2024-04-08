// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Strings} from '@openzeppelin/contracts/utils/Strings.sol';
import {ERC721, IERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {ERC721Enumerable} from '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import {ERC721URIStorage} from '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import {ReentrancyGuard} from '@openzeppelin/contracts/utils/ReentrancyGuard.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

enum TokenVersion {
  A,
  B,
  C,
  D
}

/**
 * @title Glitch
 * @dev ERC721 token contract representing a collection of digital artworks
 */
contract Glitch is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable, ReentrancyGuard {
  event Minted(address indexed recipient, uint256 indexed tokenId);
  event Burned(address indexed tokenOwner, uint256 indexed tokenId, uint256 indexed givenCode);

  uint16 private constant MAX_SUPPLY = 50;
  uint256 public refreshTokenPrice = 0.025 ether;
  address public minterContractAddress;
  address payable public fundsReceiverAddress;
  string public baseURI;
  mapping(uint256 tokenId => TokenVersion version) private _tokenVersionMap;

  /**
   * @dev Constructor function
   * @param initialOwner The initial owner of the contract
   * @param _minterContractAddress The address of the minter contract
   * @param _baseUri The base URI of the contract
   */
  constructor(address initialOwner, address _minterContractAddress, string memory _baseUri) ERC721('glitch', 'GLT') Ownable(initialOwner) {
    baseURI = _baseUri;
    minterContractAddress = _minterContractAddress;
    fundsReceiverAddress = payable(initialOwner);
  }

  /**
   * @dev Modifier to check if the caller is the minter contract or the owner
   */
  modifier _onlyMinter() {
    require(msg.sender == minterContractAddress, 'Only minter can mint');
    _;
  }

  /**
   * @dev Modifier to check if the caller is the owner
   */
  modifier _onlyOwner() {
    require(msg.sender == owner(), 'Only owner');
    _;
  }

  /**
   * @dev Mints a new token and assigns it to the specified recipient
   * @param recipient The address to receive the minted token
   */
  function mint(address recipient, uint256 _id) external _onlyMinter {
    require(recipient != address(0), 'Cannot mint to zero address');
    require(_id <= MAX_SUPPLY && _id > 0, 'Id out of bounds');
    emit Minted(recipient, _id);
    _safeMint(recipient, _id);
  }

  /**
   * @dev Updates the version of a specific token
   * @param tokenId The ID of the token
   */
  function _updateTokenVersion(uint256 tokenId) internal {
    TokenVersion nextVersion = _tokenVersionMap[tokenId];

    if (nextVersion == TokenVersion.D) {
      return;
    }

    if (nextVersion == TokenVersion.A) {
      nextVersion = TokenVersion.B;
    } else if (nextVersion == TokenVersion.B) {
      nextVersion = TokenVersion.C;
    } else if (nextVersion == TokenVersion.C) {
      nextVersion = TokenVersion.D;
    }

    _tokenVersionMap[tokenId] = nextVersion;
    emit MetadataUpdate(tokenId);
  }

  /**
   * @dev Refreshes the version of a specific token
   * @param _tokenId The ID of the token
   */
  function refreshToken(uint256 _tokenId) external payable nonReentrant {
    require(msg.value >= refreshTokenPrice, 'Not enough ETH');

    _tokenVersionMap[_tokenId] = TokenVersion.A;
    emit MetadataUpdate(_tokenId);

    (bool success, ) = fundsReceiverAddress.call{value: msg.value}('');
    require(success, 'Transfer failed.');
  }

  /**
   * @dev Burns a token to reedem a physical piece of the art
   * @param _tokenId The ID of the token to burn
   * @param _givenCode The code given to the token
   */
  function burnToReedem(uint256 _tokenId, uint256 _givenCode) public {
    // must be the token owner
    require(msg.sender == ownerOf(_tokenId), 'Only token owner');
    emit Burned(msg.sender, _tokenId, _givenCode);
    _burn(_tokenId);
  }

  /**
   * @dev Sets the address of the minter contract
   * @param newMinterContractAddress The address of the minter contract
   * @dev Only the owner can call this function
   */
  function setMinterContractAddress(address newMinterContractAddress) public _onlyOwner {
    minterContractAddress = newMinterContractAddress;
  }

  /**
   * @dev Sets the base URI for token URIs
   * @param newBaseURI The new base URI
   * @dev Only the owner can call this function
   */
  function setBaseURI(string memory newBaseURI) public _onlyOwner {
    baseURI = newBaseURI;
  }

  /**
   * @dev Sets the address of the funds receiver
   * @param newFundsReceiverAddress The address of the funds receiver
   * @dev Only the owner can call this function
   */
  function setFundsReceiverAddress(address newFundsReceiverAddress) public _onlyOwner {
    require(newFundsReceiverAddress != address(0), 'Cannot set zero address');
    fundsReceiverAddress = payable(newFundsReceiverAddress);
  }

  /**
   * @dev Sets the price of the refresh token
   * @param newRefreshTokenPriceInWei The new price of the refresh token
   * @dev Only the owner can call this function
   */
  function setRefreshTokenPrice(uint256 newRefreshTokenPriceInWei) public _onlyOwner {
    require(newRefreshTokenPriceInWei > 0, 'Invalid price');
    refreshTokenPrice = newRefreshTokenPriceInWei;
  }

  /**
   * @dev Returns the version of a specific token
   * @param tokenId The ID of the token
   * @return versionStr The version of the token
   */
  function getTokenVersion(uint256 tokenId) public view returns (string memory versionStr) {
    TokenVersion versionEnum = _tokenVersionMap[tokenId];
    if (versionEnum == TokenVersion.A) {
      versionStr = 'A';
    } else if (versionEnum == TokenVersion.B) {
      versionStr = 'B';
    } else if (versionEnum == TokenVersion.C) {
      versionStr = 'C';
    } else if (versionEnum == TokenVersion.D) {
      versionStr = 'D';
    }
  }

  /**
   * @dev Returns an array of versions for all tokens
   * @return versions An array of versions for all tokens
   */
  function getAllTokensVersion() public view returns (string[] memory versions) {
    versions = new string[](MAX_SUPPLY);
    for (uint256 i = 0; i < MAX_SUPPLY; i++) {
      // token id start on #1
      versions[i] = getTokenVersion(i + 1);
    }
  }
  /**
   * @dev Returns the URI of a specific token
   * @param tokenId The ID of the token
   * @return The URI of the token
   */
  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    _requireOwned(tokenId);
    return string(abi.encodePacked(baseURI, getTokenVersion(tokenId), '/', Strings.toString(tokenId)));
  }

  /**
   * @dev Transfers a token from one address to another
   * @param from The address to transfer the token from
   * @param to The address to transfer the token to
   * @param tokenId The ID of the token to transfer
   */
  function transferFrom(address from, address to, uint256 tokenId) public override(ERC721, IERC721) {
    _updateTokenVersion(tokenId);

    super.transferFrom(from, to, tokenId);
  }

  function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) {
    return super._update(to, tokenId, auth);
  }

  function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
    super._increaseBalance(account, value);
  }

  /**
   * @dev Checks if a specific interface is supported by the contract
   * @param interfaceId The interface ID to check
   * @return True if the interface is supported, false otherwise
   */
  function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(interfaceId);
  }
}
