'use client'

import * as React from 'react'
import { ConnectKitProvider } from 'connectkit'
import { WagmiProvider } from 'wagmi'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { config } from '../settings/wagmi'
import theme from 'settings/theme'
import { useEffect } from 'react'

const queryClient = new QueryClient()

function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false)
  useEffect(() => {
    setMounted(true)
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView()
        }
      }, 1000) // Ajuste o tempo conforme necessário
    }
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
