import { getChain } from 'utils/chain'
import { http } from 'viem'
import { mainnet, sepolia, hardhat } from 'viem/chains'
import { CreateConfigParameters, createConfig } from 'wagmi'

export const wagmiPlainConfig = {
  // Your dApps chains
  chains: [getChain()],
  transports: {
    [mainnet.id]: http(
      `https://mainnet.infura.io/v3/${process.env.NEXT_PUBLIC_PROVIDER_KEY}`,
      { batch: true },
    ),
    [sepolia.id]: http(
      `https://sepolia.infura.io/v3/${process.env.NEXT_PUBLIC_PROVIDER_KEY}`,
      { batch: true },
    ),
    [hardhat.id]: http(),
  },
  ssr: true,
} as CreateConfigParameters

export const wagmiConfig = createConfig(wagmiPlainConfig)
