import { getChain } from 'utils/chain'
import { http } from 'viem'
import { mainnet, sepolia, hardhat } from 'viem/chains'
import { CreateConfigParameters, createConfig } from 'wagmi'

export const wagmiPlainConfig = {
  // Your dApps chains
  chains: [getChain()],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http(),
  },
  ssr: true,
} as CreateConfigParameters

export const wagmiConfig = createConfig(wagmiPlainConfig)
