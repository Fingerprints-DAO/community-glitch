'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { WagmiProvider } from 'wagmi'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import theme from 'settings/theme'
import { config } from 'settings/wagmi'

const queryClient = new QueryClient()

function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
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
            <ConnectKitProvider>
              {!mounted && <p>Loading</p>}
              {mounted && children}
            </ConnectKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default Providers
