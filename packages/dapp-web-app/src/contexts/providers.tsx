'use client'

import * as React from 'react'
import { Suspense, useEffect, useState } from 'react'
import { WagmiProvider } from 'wagmi'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ConnectKitProvider } from 'connectkit'
import theme from 'settings/theme'
import { config } from 'settings/wagmi'

const queryClient = new QueryClient()

function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
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
              <Suspense fallback={'Loading...'}>{children}</Suspense>
            </ConnectKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}

export default Providers
