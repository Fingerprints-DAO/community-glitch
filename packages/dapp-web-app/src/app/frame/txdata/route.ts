import { NextResponse } from 'next/server'
import { createPublicClient, encodeFunctionData, getContract, http } from 'viem'
import { mainnet } from 'viem/chains'
import { glitchyAbi } from 'web3/contract-functions'
import { frames } from '../frames'

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
})

const handleRequest = frames(async (ctx) => {
  console.log('xd')
  if (!ctx.message) {
    throw new Error('No message')
  }
  console.log('frame minting', ctx.message.connectedAddress)
  const calldata = encodeFunctionData({
    abi: glitchyAbi,
    functionName: 'mint',
    args: [ctx.message.connectedAddress as any, 1, []],
  })

  return NextResponse.json({
    chainId: 'eip155:1',
    method: 'eth_sendTransaction',
    params: {
      abi: glitchyAbi,
      to: '0xF9989Ace51BC4698FB0bf1C8d569C90CF83A7Ab1',
      data: calldata,
      value: '25000000000000000',
    },
  })
})

export const GET = handleRequest
export const POST = handleRequest
