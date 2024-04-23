'use client'

import { Box, Flex, Text, TextProps } from '@chakra-ui/react'
import FullPageTemplate from 'components/Templates/FullPage'
import { tokens } from 'data/tokens'
import { ReactNode, useEffect, useState } from 'react'
import { MintSidebar } from './components/AuctionSidebar'
import dynamic from 'next/dynamic'
import { MintEditionProvider } from 'contexts/MintEditionContext'

const DynamicArtGrid = dynamic(() => import('./components/ArtGrid/Static'), {
  ssr: false,
})

export default function MintEditionPage() {
  return (
    <MintEditionProvider>
      <FullPageTemplate>
        <Flex
          flexDir={{ base: 'column-reverse', md: 'row' }}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          w="full"
          gap={10}
          mt={8}
        >
          <Box flex={3}>
            <DynamicArtGrid divisorOpt={{ base: 45, sm: 22, md: 38, lg: 30 }} />
          </Box>
          <MintSidebar flex={3} />
        </Flex>
      </FullPageTemplate>
    </MintEditionProvider>
  )
}
