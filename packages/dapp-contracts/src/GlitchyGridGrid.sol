// SPDX-License-Identifier: MIT
pragma solidity 0.8.23;

import {Address} from '@openzeppelin/contracts/utils/Address.sol';
import {ERC721} from '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import {ERC721Enumerable} from '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import {ERC721URIStorage} from '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import {MerkleProof} from '@openzeppelin/contracts/utils/cryptography/MerkleProof.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';
import {Strings} from '@openzeppelin/contracts/utils/Strings.sol';

/**
 * @title GlitchyGridGrid
 * @dev ERC721 token contract representing a collection of digital artworks
 * @custom:security-contact arod.mail@proton.me
 */
contract GlitchyGridGrid is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
  using Address for address payable;

  // Errors
  /**
   * @dev Error emitted when the caller is not the current minter.
   */
  error OnlyMinter();
  /**
   * @dev Error emitted when the caller is not the current owner.
   */
  error OnlyOwner();
  /**
   * @dev Error emitted when the provided address is the zero address.
   */
  error ZeroAddress();
  /**
   * @dev Error emmited when the maximum supply of tokens is exceeded.
   */
  error MaxSupplyExceeded();
  /**
   * @dev Error emitted when the maximum number of minted tokens is exceeded.
   */
  error MaxNumberOfMintedTokensExceeded();

  /**
   * @dev Error emitted when not enough funds are provided to mint the tokens.
   */
  error InsufficientFunds();

  /**
   * @dev Error emitted when the provided proof is invalid.
   */
  error InvalidProof();

  /**
   * @dev Error emitted when the start time is greater than the end time.
   */
  error InvalidStartEndTime(uint256 startTime, uint256 endTime);

  /**
   * @dev Error emitted when the config has not been set.
   */
  error ConfigNotSet();

  /**
   * @dev Error emitted when the maximum number of tokens claimed for free is exceeded.
   */
  error FreeClaimedExceeded();

  /**
   * @dev Error emitted when the maximum number of tokens that can be minted is exceeded.
   */
  error RegularMintedExceeded();

  /**
   * @dev Error emitted when the claim is made before the start time.
   */
  error ClaimNotOpen();

  /**
   * @dev Event emitted when a token is minted.
   */
  event TokenMinted(address recipient, uint16 amount);

  /**
   * @dev Event emitted when a token is claimed.
   */
  event TokenClaimed(address recipient, uint16 amount);

  uint256 private _nextTokenId; /// @notice The next token ID to be minted.
  string private baseURI; /// @notice The base URI of the contract.
  mapping(bytes32 proof => bool used) private usedProofs; /// @notice The used proofs for claim.
  uint16 public constant MAX_SUPPLY = 510; /// @notice The maximum number of tokens that can be minted.
  uint8 private constant MAX_NUMBER_PER_MINT = 10; /// @notice The maximum number of tokens that can be minted at once.
  uint8 public constant FREE_CLAIM_AMOUNT = 41; /// @notice The amount of tokens that can be claimed for free.
  uint16 public constant DISCOUNT_PERCENTAGE = 15; /// @notice 15% discount for allowlisted users.
  uint256 public tokenPrice = 0.025 ether; /// @notice The price to mint.
  address payable public fundsReceiverAddress; /// @notice The address of the funds receiver.
  bytes32 private discountAllowlistRoot; /// @notice The root of the discount allowlist merkle tree.
  bytes32 private freeClaimAllowlistRoot; /// @notice The root of the free claim allowlist merkle tree.
  Config private _config; /// @notice The mint configuration.
  uint16 public freeClaimed; /// @notice The number of tokens claimed for free.
  uint16 public regularMinted; /// @notice The number of tokens minted.

  /// @dev Represents the mint configuration.
  struct Config {
    /// @notice The start time of the mint.
    uint256 startTime;
    /// @notice The end time of the mint.
    uint256 endTime;
  }

  /**
   * @dev Constructor function
   * @param _initialOwner The initial owner of the contract
   * @param _baseUri The base URI of the contract
   */
  constructor(address _initialOwner, string memory _baseUri, address _treasuryWallet) ERC721('glitchy grid grid', 'GGG') Ownable(_initialOwner) {
    baseURI = _baseUri;
    fundsReceiverAddress = payable(_treasuryWallet);
  }

  /**
   * @dev Modifier to check if the caller is the owner
   */
  modifier _onlyOwner() {
    if (_msgSender() != owner()) revert OnlyOwner();
    _;
  }

  /**
   * @dev Modifier to check if the configuration is valid.
   * @dev Throws ConfigNotSet error if the start time is not set.
   */
  modifier validConfig() {
    if (_config.startTime == 0) revert ConfigNotSet();
    _;
  }

  /**
   * @dev Modifier to check if the current block timestamp is within the specified start and end time.
   * @dev Throws InvalidStartEndTime error if the current timestamp is not between the start and end time.
   */
  modifier validTime() {
    Config memory config = _config;
    if (block.timestamp >= config.endTime || block.timestamp <= config.startTime) revert InvalidStartEndTime(config.startTime, config.endTime);
    _;
  }

  /**
   * @dev Mints a new token and assigns it to the specified recipient
   * @param _recipient The address to receive the minted token
   * @param _amount The amount of tokens to mint
   */
  function mint(address _recipient, uint8 _amount, bytes32[] calldata _merkleProof) external payable validConfig validTime {
    if (regularMinted + _amount > (MAX_SUPPLY - FREE_CLAIM_AMOUNT)) revert RegularMintedExceeded();

    bool isDiscounted = checkDiscountMerkleProof(_merkleProof, _msgSender());

    uint256 price = calculatePrice(_amount, isDiscounted);

    if (msg.value < price) revert InsufficientFunds();

    regularMinted += _amount;
    emit TokenMinted(_recipient, _amount);
    _mintTokens(_recipient, _amount);
  }

  /**
   * @dev Allows to claim tokens for free using a merkle proof
   * @param _recipient The address to receive the minted tokens
   * @param _amount The amount of tokens to mint
   * @param proof The merkle proof to be checked
   */
  function claim(address _recipient, uint8 _amount, bytes32[] calldata proof) external validConfig {
    if (block.timestamp <= _config.startTime) revert ClaimNotOpen();
    if (freeClaimed + _amount > FREE_CLAIM_AMOUNT) revert FreeClaimedExceeded();
    if (!checkFreeClaimAllowlist(proof, _recipient, _amount)) revert InvalidProof();

    usedProofs[keccak256(abi.encodePacked(proof))] = true;
    freeClaimed += _amount;
    emit TokenClaimed(_recipient, _amount);
    _mintTokens(_recipient, _amount);
  }

  /**
   * @dev Internal function to mint tokens
   * @param _recipient The address to receive the minted tokens
   * @param _amount The amount of tokens to mint
   */
  function _mintTokens(address _recipient, uint16 _amount) internal {
    if (_recipient == address(0)) revert ZeroAddress();
    if (_amount > MAX_NUMBER_PER_MINT) revert MaxNumberOfMintedTokensExceeded();

    if (_nextTokenId + _amount > MAX_SUPPLY) revert MaxSupplyExceeded();

    for (uint8 i = 0; i < _amount; i++) {
      _safeMint(_recipient, ++_nextTokenId);
    }
  }

  /**
   * @dev Owner mints for free a new token and assigns it to the specified recipient
   * @param _recipient The address to receive the minted token
   * @param _amount The amount of tokens to mint
   */
  function ownerMint(address _recipient, uint16 _amount) external _onlyOwner {
    _mintTokens(_recipient, _amount);
  }

  /**
   * @dev Withdraws the contract balance to the funds receiver address
   * @dev Only the owner can call this function
   */
  function withdraw() external _onlyOwner {
    fundsReceiverAddress.sendValue(address(this).balance);
  }

  /**
   * @notice Sets the configuration parameters for the auction.
   * @dev This function can only be called by an admin. It can be used to set the start time, end time,
   *  minimum bid increment in WEI, and starting bid amount.
   * @param _startTime Auction start time
   * @param _endTime Auction end time
   */
  function setConfig(uint256 _startTime, uint256 _endTime) external _onlyOwner {
    if (_startTime == 0 || _startTime >= _endTime) revert InvalidStartEndTime(_startTime, _endTime);

    _config = Config({startTime: _startTime, endTime: _endTime});
  }

  /**
   * @dev Allows the owner to set the root of the discount allowlist merkle tree
   * @param _allowlistRoot The new root of the discount allowlist merkle tree
   */
  function setDiscountAllowlistRoot(bytes32 _allowlistRoot) external _onlyOwner {
    discountAllowlistRoot = _allowlistRoot;
  }

  /**
   * @dev Allows the owner to set the root of the free claim allowlist merkle tree
   * @param _allowlistRoot The new root of the free claim allowlist merkle tree
   */
  function setFreeClaimAllowlistRoot(bytes32 _allowlistRoot) external _onlyOwner {
    freeClaimAllowlistRoot = _allowlistRoot;
  }

  /**
   * @dev Allows the owner to set the price of a token
   * @param _tokenPrice The new price of a token
   */
  function setTokenPrice(uint256 _tokenPrice) external _onlyOwner {
    tokenPrice = _tokenPrice;
  }

  /**
   * @dev Sets the base URI for token URIs
   * @param _newBaseURI The new base URI
   * @dev Only the owner can call this function
   */
  function setBaseURI(string memory _newBaseURI) external _onlyOwner {
    baseURI = _newBaseURI;
  }

  /**
   * @dev Sets the address of the funds receiver
   * @param newFundsReceiverAddress The address of the funds receiver
   * @dev Only the owner can call this function
   */
  function setFundsReceiverAddress(address newFundsReceiverAddress) external _onlyOwner {
    if (newFundsReceiverAddress == address(0)) revert ZeroAddress();
    fundsReceiverAddress = payable(newFundsReceiverAddress);
  }

  /**
   * @dev Calculates the price of minting a specified amount of tokens
   * @param _amount The amount of tokens to mint
   * @param _isDiscounted Whether the user is on the discount allowlist
   * @return The price of minting the specified amount of tokens
   */
  function calculatePrice(uint8 _amount, bool _isDiscounted) public view returns (uint256) {
    uint256 price = tokenPrice * _amount;
    if (_isDiscounted) {
      price = (price * (100 - DISCOUNT_PERCENTAGE)) / 100;
    }
    return price;
  }

  /**
   * @dev Checks if a merkle proof is valid.
   * @param _merkleProof The merkle proof to be checked.
   * @param _address The address to be checked.
   */
  function checkFreeClaimAllowlist(bytes32[] calldata _merkleProof, address _address, uint8 _amount) public view returns (bool) {
    bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(_address, _amount))));

    if (usedProofs[keccak256(abi.encodePacked(_merkleProof))]) revert InvalidProof();

    return MerkleProof.verify(_merkleProof, freeClaimAllowlistRoot, leaf);
  }

  /**
   * @dev Checks the validity of a discount Merkle proof for a given address.
   * @param _merkleProof The Merkle proof array.
   * @param _address The address for which the Merkle proof is being checked.
   * @return A boolean indicating whether the Merkle proof is valid or not.
   */
  function checkDiscountMerkleProof(bytes32[] calldata _merkleProof, address _address) public view returns (bool) {
    bytes32 leaf = keccak256(abi.encodePacked(_address));

    return MerkleProof.verify(_merkleProof, discountAllowlistRoot, leaf);
  }

  /**
   * @dev Returns the URI of a specific token
   * @param tokenId The ID of the token
   * @return The URI of the token
   */
  function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
    _requireOwned(tokenId);
    return string(abi.encodePacked(baseURI, Strings.toString(tokenId)));
  }

  /**
   * @dev Returns the current configuration of the auction.
   * @return The auction configuration.
   */
  function getConfig() external view returns (Config memory) {
    return _config;
  }

  function _update(address _to, uint256 _tokenId, address _auth) internal override(ERC721, ERC721Enumerable) returns (address) {
    return super._update(_to, _tokenId, _auth);
  }

  function _increaseBalance(address _account, uint128 _value) internal override(ERC721, ERC721Enumerable) {
    super._increaseBalance(_account, _value);
  }

  /**
   * @dev Checks if a specific interface is supported by the contract
   * @param _interfaceId The interface ID to check
   * @return True if the interface is supported, false otherwise
   */
  function supportsInterface(bytes4 _interfaceId) public view override(ERC721, ERC721URIStorage, ERC721Enumerable) returns (bool) {
    return super.supportsInterface(_interfaceId);
  }
}
