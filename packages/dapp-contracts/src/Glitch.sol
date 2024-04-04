// SPDX-License-Identifier: MIT
pragma solidity >=0.8.23;

import {Strings} from '@openzeppelin/contracts/utils/Strings.sol';
import {ERC721, IERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {ERC721Enumerable} from '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import {ERC721URIStorage} from '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import {ERC721Burnable} from '@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol';
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
contract Glitch is ERC721, ERC721Enumerable, ERC721URIStorage, ERC721Burnable, Ownable {
  uint16 private constant MAX_SUPPLY = 50;
  address public minterContractAddress;
  string public baseURI;
  event Minted(address indexed recipient, uint256 indexed tokenId);
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
    _safeMint(recipient, _id);
    emit Minted(recipient, _id);
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
   * @dev Returns the total number of tokens minted
   * @return The total supply of tokens
   */
  function totalSupply() public pure override(ERC721Enumerable) returns (uint256) {
    return MAX_SUPPLY;
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
  }

  /**
   * @dev Refreshes the version of a specific token
   * @param tokenId The ID of the token
   */
  function refreshToken(uint256 tokenId) public {
    _tokenVersionMap[tokenId] = TokenVersion.A;
  }

  /**
   * @dev Sets the address of the minter contract
   * @param newMinterContractAddress The address of the minter contract
   */
  function setMinterContractAddress(address newMinterContractAddress) public _onlyOwner {
    minterContractAddress = newMinterContractAddress;
  }

  /**
   * @dev Sets the base URI for token URIs
   * @param newBaseURI The new base URI
   */
  function setBaseURI(string memory newBaseURI) public _onlyOwner {
    baseURI = newBaseURI;
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
