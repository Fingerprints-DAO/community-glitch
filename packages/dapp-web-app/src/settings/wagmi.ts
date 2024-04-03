'use client'
import { getDefaultConfig } from 'connectkit'
import { createConfig } from 'wagmi'
import { wagmiPlainConfig } from './wagmiConfig'

// const walletConnectProjectId = '5e9390a7f8281ac44f6cf4348e74bdc5'

// export const config = createConfig({
//   chains: [getChain()],
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//     [hardhat.id]: http(),
//   },
// })

export const config = createConfig(
  getDefaultConfig({
    ...wagmiPlainConfig,
    // Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
      '5e9390a7f8281ac44f6cf4348e74bdc5',

    // Required App Info
    appName: 'glitch',
  }),
)

// const { chains } = configureChains(selectedChain, [
//   infuraProvider({ apiKey: process.env.NEXT_PUBLIC_PROVIDER_KEY || '' }),
//   jsonRpcProvider({
//     rpc: (chain) => {
//       if (chain.id === sepolia.id) return null
//       return {
//         http: chain.rpcUrls.default.http[0],
//       }
//     },
//   }),
// ])

// export const config = createConfig(
//   getDefaultConfig({
//     autoConnect: true,
//     appName: 'My wagmi + ConnectKit App',
//     walletConnectProjectId,
//     infuraId: process.env.NEXT_PUBLIC_PROVIDER_KEY,
//     chains,
//   })
// )

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
