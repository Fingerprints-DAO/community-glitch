import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

import {
  createReadContract,
  createWriteContract,
  createSimulateContract,
  createWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// auction
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const auctionAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'initialOwner', internalType: 'address', type: 'address' },
      { name: '_erc721Address', internalType: 'address', type: 'address' },
      { name: '_treasuryWallet', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'MAX_TOP_BIDS',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_recipient', internalType: 'address', type: 'address' }],
    name: 'adminMintRemaining',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'bidAmount', internalType: 'uint256', type: 'uint256' },
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
    ],
    name: 'bid',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'bidBalances',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'merkleProof', internalType: 'bytes32[]', type: 'bytes32[]' },
      { name: '_address', internalType: 'address', type: 'address' },
      { name: '_root', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'checkMerkleProof',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'claimAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'address', type: 'address' }],
    name: 'claimed',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'erc721Address',
    outputs: [{ name: '', internalType: 'contract IGlitch', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'firstTierMerkleRoot',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getConfig',
    outputs: [
      {
        name: '',
        internalType: 'struct Config',
        type: 'tuple',
        components: [
          { name: 'startTime', internalType: 'uint256', type: 'uint256' },
          { name: 'endTime', internalType: 'uint256', type: 'uint256' },
          {
            name: 'minBidIncrementInWei',
            internalType: 'uint256',
            type: 'uint256',
          },
          {
            name: 'startAmountInWei',
            internalType: 'uint256',
            type: 'uint256',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getMinimumBid',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getSettledPrice',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'discountType',
        internalType: 'enum DiscountType',
        type: 'uint8',
      },
    ],
    name: 'getSettledPriceWithDiscount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getTopBids',
    outputs: [
      {
        name: '',
        internalType: 'struct Bid[10]',
        type: 'tuple[10]',
        components: [
          { name: 'bidder', internalType: 'address', type: 'address' },
          { name: 'amount', internalType: 'uint256', type: 'uint256' },
          {
            name: 'discountType',
            internalType: 'enum DiscountType',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'secondTierMerkleRoot',
    outputs: [{ name: '', internalType: 'bytes32', type: 'bytes32' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '_startTime', internalType: 'uint256', type: 'uint256' },
      { name: '_endTime', internalType: 'uint256', type: 'uint256' },
      {
        name: '_minBidIncrementInWei',
        internalType: 'uint256',
        type: 'uint256',
      },
      { name: '_startAmountInWei', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setConfig',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_firstTierRoot', internalType: 'bytes32', type: 'bytes32' },
      { name: '_secondTierRoot', internalType: 'bytes32', type: 'bytes32' },
    ],
    name: 'setMerkleRoots',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newWallet', internalType: 'address', type: 'address' }],
    name: 'setTreasuryWallet',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'topBids',
    outputs: [
      { name: 'bidder', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      {
        name: 'discountType',
        internalType: 'enum DiscountType',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'treasuryWallet',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawn',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  { type: 'error', inputs: [], name: 'ConfigNotSet' },
  { type: 'error', inputs: [], name: 'InvalidAmountInWei' },
  { type: 'error', inputs: [], name: 'InvalidMinBidIncrementValue' },
  {
    type: 'error',
    inputs: [
      { name: 'startTime', internalType: 'uint256', type: 'uint256' },
      { name: 'endTime', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'InvalidStartEndTime',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

export const auctionAddress =
  '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512' as const

export const auctionConfig = {
  address: auctionAddress,
  abi: auctionAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// glitch
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const glitchAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'initialOwner', internalType: 'address', type: 'address' },
      {
        name: '_minterContractAddress',
        internalType: 'address',
        type: 'address',
      },
      { name: '_baseUri', internalType: 'string', type: 'string' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'baseURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAllTokensVersion',
    outputs: [{ name: 'versions', internalType: 'string[]', type: 'string[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getApproved',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'getTokenVersion',
    outputs: [{ name: 'versionStr', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'recipient', internalType: 'address', type: 'address' },
      { name: '_id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'minterContractAddress',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ownerOf',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'refreshToken',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newBaseURI', internalType: 'string', type: 'string' }],
    name: 'setBaseURI',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      {
        name: 'newMinterContractAddress',
        internalType: 'address',
        type: 'address',
      },
    ],
    name: 'setMinterContractAddress',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'index', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'tokenOfOwnerByIndex',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'tokenURI',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'approved',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_fromTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: '_toTokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BatchMetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: '_tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'MetadataUpdate',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'tokenId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Transfer',
  },
  { type: 'error', inputs: [], name: 'ERC721EnumerableForbiddenBatchMint' },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC721IncorrectOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721InsufficientApproval',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC721InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'tokenId', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC721NonexistentToken',
  },
  {
    type: 'error',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'index', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC721OutOfBoundsIndex',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
] as const

export const glitchAddress =
  '0x5FbDB2315678afecb367f032d93F642f64180aa3' as const

export const glitchConfig = { address: glitchAddress, abi: glitchAbi } as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__
 */
export const useReadAuction = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"MAX_TOP_BIDS"`
 */
export const useReadAuctionMaxTopBids = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'MAX_TOP_BIDS',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"bidBalances"`
 */
export const useReadAuctionBidBalances = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'bidBalances',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"checkMerkleProof"`
 */
export const useReadAuctionCheckMerkleProof =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'checkMerkleProof',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"claimed"`
 */
export const useReadAuctionClaimed = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'claimed',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"erc721Address"`
 */
export const useReadAuctionErc721Address = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'erc721Address',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"firstTierMerkleRoot"`
 */
export const useReadAuctionFirstTierMerkleRoot =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'firstTierMerkleRoot',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getConfig"`
 */
export const useReadAuctionGetConfig = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'getConfig',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getMinimumBid"`
 */
export const useReadAuctionGetMinimumBid = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'getMinimumBid',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getSettledPrice"`
 */
export const useReadAuctionGetSettledPrice =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'getSettledPrice',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getSettledPriceWithDiscount"`
 */
export const useReadAuctionGetSettledPriceWithDiscount =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'getSettledPriceWithDiscount',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getTopBids"`
 */
export const useReadAuctionGetTopBids = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'getTopBids',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"owner"`
 */
export const useReadAuctionOwner = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"secondTierMerkleRoot"`
 */
export const useReadAuctionSecondTierMerkleRoot =
  /*#__PURE__*/ createUseReadContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'secondTierMerkleRoot',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"topBids"`
 */
export const useReadAuctionTopBids = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'topBids',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"treasuryWallet"`
 */
export const useReadAuctionTreasuryWallet = /*#__PURE__*/ createUseReadContract(
  { abi: auctionAbi, address: auctionAddress, functionName: 'treasuryWallet' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"withdrawn"`
 */
export const useReadAuctionWithdrawn = /*#__PURE__*/ createUseReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'withdrawn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__
 */
export const useWriteAuction = /*#__PURE__*/ createUseWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"adminMintRemaining"`
 */
export const useWriteAuctionAdminMintRemaining =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'adminMintRemaining',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"bid"`
 */
export const useWriteAuctionBid = /*#__PURE__*/ createUseWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'bid',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"claimAll"`
 */
export const useWriteAuctionClaimAll = /*#__PURE__*/ createUseWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'claimAll',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteAuctionRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setConfig"`
 */
export const useWriteAuctionSetConfig = /*#__PURE__*/ createUseWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'setConfig',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setMerkleRoots"`
 */
export const useWriteAuctionSetMerkleRoots =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setMerkleRoots',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setTreasuryWallet"`
 */
export const useWriteAuctionSetTreasuryWallet =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setTreasuryWallet',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteAuctionTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteAuctionWithdraw = /*#__PURE__*/ createUseWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__
 */
export const useSimulateAuction = /*#__PURE__*/ createUseSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"adminMintRemaining"`
 */
export const useSimulateAuctionAdminMintRemaining =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'adminMintRemaining',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"bid"`
 */
export const useSimulateAuctionBid = /*#__PURE__*/ createUseSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'bid',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"claimAll"`
 */
export const useSimulateAuctionClaimAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'claimAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateAuctionRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setConfig"`
 */
export const useSimulateAuctionSetConfig =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setConfig',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setMerkleRoots"`
 */
export const useSimulateAuctionSetMerkleRoots =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setMerkleRoots',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setTreasuryWallet"`
 */
export const useSimulateAuctionSetTreasuryWallet =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setTreasuryWallet',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateAuctionTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateAuctionWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionAbi}__
 */
export const useWatchAuctionEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link auctionAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchAuctionOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: auctionAbi,
    address: auctionAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__
 */
export const useReadGlitch = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadGlitchBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"baseURI"`
 */
export const useReadGlitchBaseUri = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'baseURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"getAllTokensVersion"`
 */
export const useReadGlitchGetAllTokensVersion =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'getAllTokensVersion',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"getApproved"`
 */
export const useReadGlitchGetApproved = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"getTokenVersion"`
 */
export const useReadGlitchGetTokenVersion = /*#__PURE__*/ createUseReadContract(
  { abi: glitchAbi, address: glitchAddress, functionName: 'getTokenVersion' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadGlitchIsApprovedForAll =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'isApprovedForAll',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"minterContractAddress"`
 */
export const useReadGlitchMinterContractAddress =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'minterContractAddress',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"name"`
 */
export const useReadGlitchName = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"owner"`
 */
export const useReadGlitchOwner = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"ownerOf"`
 */
export const useReadGlitchOwnerOf = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadGlitchSupportsInterface =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'supportsInterface',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadGlitchSymbol = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"tokenByIndex"`
 */
export const useReadGlitchTokenByIndex = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'tokenByIndex',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 */
export const useReadGlitchTokenOfOwnerByIndex =
  /*#__PURE__*/ createUseReadContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'tokenOfOwnerByIndex',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"tokenURI"`
 */
export const useReadGlitchTokenUri = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadGlitchTotalSupply = /*#__PURE__*/ createUseReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__
 */
export const useWriteGlitch = /*#__PURE__*/ createUseWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteGlitchApprove = /*#__PURE__*/ createUseWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteGlitchBurn = /*#__PURE__*/ createUseWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"mint"`
 */
export const useWriteGlitchMint = /*#__PURE__*/ createUseWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"refreshToken"`
 */
export const useWriteGlitchRefreshToken = /*#__PURE__*/ createUseWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'refreshToken',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteGlitchRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteGlitchSafeTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteGlitchSetApprovalForAll =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const useWriteGlitchSetBaseUri = /*#__PURE__*/ createUseWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'setBaseURI',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setMinterContractAddress"`
 */
export const useWriteGlitchSetMinterContractAddress =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setMinterContractAddress',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteGlitchTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteGlitchTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__
 */
export const useSimulateGlitch = /*#__PURE__*/ createUseSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateGlitchApprove = /*#__PURE__*/ createUseSimulateContract(
  { abi: glitchAbi, address: glitchAddress, functionName: 'approve' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateGlitchBurn = /*#__PURE__*/ createUseSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"mint"`
 */
export const useSimulateGlitchMint = /*#__PURE__*/ createUseSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"refreshToken"`
 */
export const useSimulateGlitchRefreshToken =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'refreshToken',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateGlitchRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateGlitchSafeTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateGlitchSetApprovalForAll =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const useSimulateGlitchSetBaseUri =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setBaseURI',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setMinterContractAddress"`
 */
export const useSimulateGlitchSetMinterContractAddress =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setMinterContractAddress',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateGlitchTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateGlitchTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__
 */
export const useWatchGlitchEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchGlitchApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchGlitchApprovalForAllEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const useWatchGlitchBatchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const useWatchGlitchMetadataUpdateEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchGlitchOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchGlitchTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'Transfer',
  })

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Action
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__
 */
export const readAuction = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"MAX_TOP_BIDS"`
 */
export const readAuctionMaxTopBids = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'MAX_TOP_BIDS',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"bidBalances"`
 */
export const readAuctionBidBalances = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'bidBalances',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"checkMerkleProof"`
 */
export const readAuctionCheckMerkleProof = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'checkMerkleProof',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"claimed"`
 */
export const readAuctionClaimed = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'claimed',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"erc721Address"`
 */
export const readAuctionErc721Address = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'erc721Address',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"firstTierMerkleRoot"`
 */
export const readAuctionFirstTierMerkleRoot = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'firstTierMerkleRoot',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getConfig"`
 */
export const readAuctionGetConfig = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'getConfig',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getMinimumBid"`
 */
export const readAuctionGetMinimumBid = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'getMinimumBid',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getSettledPrice"`
 */
export const readAuctionGetSettledPrice = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'getSettledPrice',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getSettledPriceWithDiscount"`
 */
export const readAuctionGetSettledPriceWithDiscount =
  /*#__PURE__*/ createReadContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'getSettledPriceWithDiscount',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"getTopBids"`
 */
export const readAuctionGetTopBids = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'getTopBids',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"owner"`
 */
export const readAuctionOwner = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"secondTierMerkleRoot"`
 */
export const readAuctionSecondTierMerkleRoot = /*#__PURE__*/ createReadContract(
  {
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'secondTierMerkleRoot',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"topBids"`
 */
export const readAuctionTopBids = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'topBids',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"treasuryWallet"`
 */
export const readAuctionTreasuryWallet = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'treasuryWallet',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"withdrawn"`
 */
export const readAuctionWithdrawn = /*#__PURE__*/ createReadContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'withdrawn',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__
 */
export const writeAuction = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"adminMintRemaining"`
 */
export const writeAuctionAdminMintRemaining = /*#__PURE__*/ createWriteContract(
  {
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'adminMintRemaining',
  },
)

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"bid"`
 */
export const writeAuctionBid = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'bid',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"claimAll"`
 */
export const writeAuctionClaimAll = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'claimAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeAuctionRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setConfig"`
 */
export const writeAuctionSetConfig = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'setConfig',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setMerkleRoots"`
 */
export const writeAuctionSetMerkleRoots = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'setMerkleRoots',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setTreasuryWallet"`
 */
export const writeAuctionSetTreasuryWallet = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'setTreasuryWallet',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeAuctionTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"withdraw"`
 */
export const writeAuctionWithdraw = /*#__PURE__*/ createWriteContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__
 */
export const simulateAuction = /*#__PURE__*/ createSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"adminMintRemaining"`
 */
export const simulateAuctionAdminMintRemaining =
  /*#__PURE__*/ createSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'adminMintRemaining',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"bid"`
 */
export const simulateAuctionBid = /*#__PURE__*/ createSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'bid',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"claimAll"`
 */
export const simulateAuctionClaimAll = /*#__PURE__*/ createSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'claimAll',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateAuctionRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setConfig"`
 */
export const simulateAuctionSetConfig = /*#__PURE__*/ createSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'setConfig',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setMerkleRoots"`
 */
export const simulateAuctionSetMerkleRoots =
  /*#__PURE__*/ createSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setMerkleRoots',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"setTreasuryWallet"`
 */
export const simulateAuctionSetTreasuryWallet =
  /*#__PURE__*/ createSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'setTreasuryWallet',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateAuctionTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: auctionAbi,
    address: auctionAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link auctionAbi}__ and `functionName` set to `"withdraw"`
 */
export const simulateAuctionWithdraw = /*#__PURE__*/ createSimulateContract({
  abi: auctionAbi,
  address: auctionAddress,
  functionName: 'withdraw',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link auctionAbi}__
 */
export const watchAuctionEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: auctionAbi,
  address: auctionAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link auctionAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchAuctionOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: auctionAbi,
    address: auctionAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__
 */
export const readGlitch = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"balanceOf"`
 */
export const readGlitchBalanceOf = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"baseURI"`
 */
export const readGlitchBaseUri = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'baseURI',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"getAllTokensVersion"`
 */
export const readGlitchGetAllTokensVersion = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'getAllTokensVersion',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"getApproved"`
 */
export const readGlitchGetApproved = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'getApproved',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"getTokenVersion"`
 */
export const readGlitchGetTokenVersion = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'getTokenVersion',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const readGlitchIsApprovedForAll = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"minterContractAddress"`
 */
export const readGlitchMinterContractAddress = /*#__PURE__*/ createReadContract(
  {
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'minterContractAddress',
  },
)

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"name"`
 */
export const readGlitchName = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'name',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"owner"`
 */
export const readGlitchOwner = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"ownerOf"`
 */
export const readGlitchOwnerOf = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'ownerOf',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const readGlitchSupportsInterface = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"symbol"`
 */
export const readGlitchSymbol = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'symbol',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"tokenByIndex"`
 */
export const readGlitchTokenByIndex = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'tokenByIndex',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"tokenOfOwnerByIndex"`
 */
export const readGlitchTokenOfOwnerByIndex = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'tokenOfOwnerByIndex',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"tokenURI"`
 */
export const readGlitchTokenUri = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'tokenURI',
})

/**
 * Wraps __{@link readContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"totalSupply"`
 */
export const readGlitchTotalSupply = /*#__PURE__*/ createReadContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'totalSupply',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__
 */
export const writeGlitch = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"approve"`
 */
export const writeGlitchApprove = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"burn"`
 */
export const writeGlitchBurn = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"mint"`
 */
export const writeGlitchMint = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"refreshToken"`
 */
export const writeGlitchRefreshToken = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'refreshToken',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const writeGlitchRenounceOwnership = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const writeGlitchSafeTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const writeGlitchSetApprovalForAll = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const writeGlitchSetBaseUri = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'setBaseURI',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setMinterContractAddress"`
 */
export const writeGlitchSetMinterContractAddress =
  /*#__PURE__*/ createWriteContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setMinterContractAddress',
  })

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferFrom"`
 */
export const writeGlitchTransferFrom = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link writeContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const writeGlitchTransferOwnership = /*#__PURE__*/ createWriteContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__
 */
export const simulateGlitch = /*#__PURE__*/ createSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"approve"`
 */
export const simulateGlitchApprove = /*#__PURE__*/ createSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'approve',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"burn"`
 */
export const simulateGlitchBurn = /*#__PURE__*/ createSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'burn',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"mint"`
 */
export const simulateGlitchMint = /*#__PURE__*/ createSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'mint',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"refreshToken"`
 */
export const simulateGlitchRefreshToken = /*#__PURE__*/ createSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'refreshToken',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const simulateGlitchRenounceOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const simulateGlitchSafeTransferFrom =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'safeTransferFrom',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const simulateGlitchSetApprovalForAll =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setApprovalForAll',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setBaseURI"`
 */
export const simulateGlitchSetBaseUri = /*#__PURE__*/ createSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'setBaseURI',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"setMinterContractAddress"`
 */
export const simulateGlitchSetMinterContractAddress =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'setMinterContractAddress',
  })

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferFrom"`
 */
export const simulateGlitchTransferFrom = /*#__PURE__*/ createSimulateContract({
  abi: glitchAbi,
  address: glitchAddress,
  functionName: 'transferFrom',
})

/**
 * Wraps __{@link simulateContract}__ with `abi` set to __{@link glitchAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const simulateGlitchTransferOwnership =
  /*#__PURE__*/ createSimulateContract({
    abi: glitchAbi,
    address: glitchAddress,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__
 */
export const watchGlitchEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: glitchAbi,
  address: glitchAddress,
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"Approval"`
 */
export const watchGlitchApprovalEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: glitchAbi,
  address: glitchAddress,
  eventName: 'Approval',
})

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const watchGlitchApprovalForAllEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'ApprovalForAll',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"BatchMetadataUpdate"`
 */
export const watchGlitchBatchMetadataUpdateEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'BatchMetadataUpdate',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"MetadataUpdate"`
 */
export const watchGlitchMetadataUpdateEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'MetadataUpdate',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const watchGlitchOwnershipTransferredEvent =
  /*#__PURE__*/ createWatchContractEvent({
    abi: glitchAbi,
    address: glitchAddress,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link watchContractEvent}__ with `abi` set to __{@link glitchAbi}__ and `eventName` set to `"Transfer"`
 */
export const watchGlitchTransferEvent = /*#__PURE__*/ createWatchContractEvent({
  abi: glitchAbi,
  address: glitchAddress,
  eventName: 'Transfer',
})
