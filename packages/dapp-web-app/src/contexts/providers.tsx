'use client'

import * as React from 'react'
import { ConnectKitProvider } from 'connectkit'
import { WagmiProvider } from 'wagmi'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import duration from 'dayjs/plugin/duration'
import dayjs from 'dayjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '../settings/wagmi'
import theme from 'settings/theme'

dayjs.extend(duration)

const queryClient = new QueryClient()

function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {!mounted && <p>Loading</p>}
            {mounted && children}
            {/* <ConnectKitProvider>
              {mounted && children}
              </ConnectKitProvider> */}
          </QueryClientProvider>
        </WagmiProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default Providers
