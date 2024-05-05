import { createFrames } from 'frames.js/next'
import { NextResponse } from 'next/server'
import { createPublicClient, encodeFunctionData, getContract, http } from 'viem'
import { sepolia } from 'viem/chains'
import { glitchyAbi, glitchyAddress } from 'web3/contract-functions'

const frames = createFrames({
  basePath: '/frame',
})

export const POST = frames(async (ctx) => {
  if (!ctx.message) {
    throw new Error('No message')
  }

  const calldata = encodeFunctionData({
    abi: glitchyAbi,
    functionName: 'mint',
    args: [ctx.message.connectedAddress as any, 1, []],
  })

  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(),
  })

  const glitchyContract = getContract({
    address: glitchyAddress,
    abi: glitchyAbi,
    client: publicClient,
  })

  const unitPrice = await glitchyContract.read.tokenPrice()

  return NextResponse.json({
    chainId: 'eip155:11155111', // sepolia
    method: 'eth_sendTransaction',
    params: {
      abi: glitchyAbi,
      to: glitchyAddress,
      data: calldata,
      value: unitPrice.toString(),
    },
  })
})
