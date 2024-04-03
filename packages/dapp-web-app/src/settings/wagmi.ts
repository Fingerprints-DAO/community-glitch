import { getDefaultConfig } from 'connectkit'
import { getChain } from 'utils/chain'
import { http, createConfig } from 'wagmi'
import { hardhat, mainnet, sepolia } from 'wagmi/chains'

// const walletConnectProjectId = '5e9390a7f8281ac44f6cf4348e74bdc5'

// export const config = createConfig({
//   chains: [getChain()],
//   transports: {
//     [mainnet.id]: http(),
//     [sepolia.id]: http(),
//     [hardhat.id]: http(),
//   },
// })

console.log(getChain())
export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [getChain()],
    transports: {
      [mainnet.id]: http(),
      [sepolia.id]: http(),
      [hardhat.id]: http(),
    },

    // Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
      '5e9390a7f8281ac44f6cf4348e74bdc5',

    // Required App Info
    appName: 'Your App Name',

    appDescription: 'Your App Description',
    appUrl: 'https://family.co', // your app's url
    appIcon: 'https://family.co/logo.png', // your app's icon, no bigger than 1024x1024px (max. 1MB)
    ssr: true,
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
