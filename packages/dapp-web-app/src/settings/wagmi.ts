'use client'
import { getDefaultConfig } from 'connectkit'
import { createConfig, createStorage, noopStorage } from 'wagmi'
import { wagmiPlainConfig } from './wagmiConfig'
import { getChainId } from 'utils/chain'

export const config = createConfig(
  getDefaultConfig({
    ...wagmiPlainConfig,
    // Required API Keys
    walletConnectProjectId:
      process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID ??
      '5e9390a7f8281ac44f6cf4348e74bdc5',

    // Required App Info
    appName: 'glitch',

    storage: createStorage({
      storage:
        typeof window !== 'undefined' && window.localStorage
          ? window.localStorage
          : noopStorage,
      key: `wagmi-store-${getChainId()}`,
    }),
  }),
)

declare module 'wagmi' {
  interface Register {
    config: typeof config
  }
}
