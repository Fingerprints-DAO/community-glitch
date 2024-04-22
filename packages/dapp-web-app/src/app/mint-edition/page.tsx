'use client'

import { Box, Flex, Text, TextProps } from '@chakra-ui/react'
import FullPageTemplate from 'components/Templates/FullPage'
import { tokens } from 'data/tokens'
import { ReactNode, useEffect, useState } from 'react'
import { AuctionProvider } from 'contexts/AuctionContext'
import { AuctionSidebar } from './AuctionSidebar'
import dynamic from 'next/dynamic'

const DynamicArtGrid = dynamic(() => import('components/ArtGrid/Static'), {
  ssr: false,
})

const TextSection = ({
  title,
  children,
  ...props
}: {
  title: string
  children: ReactNode
  props?: TextProps
}) => (
  <>
    <Text as={'h2'} fontSize={'xl'} fontWeight={'bold'} {...props}>
      {title}
    </Text>
    <Text as={'div'}>{children}</Text>
  </>
)

const SubTitle = ({
  children,
  ...props
}: {
  children: ReactNode
  props?: TextProps
}) => (
  <Text as={'h3'} fontSize={'lg'} fontWeight={'bold'} mt={4} {...props}>
    {children}
  </Text>
)
const SubTextSection = ({
  title,
  children,
  ...props
}: {
  title: string
  children: ReactNode
  props?: TextProps
}) => (
  <>
    <SubTitle {...props}>{title}</SubTitle>
    <Text as={'div'} fontSize={'md'}>
      {children}
    </Text>
  </>
)

export default function Auction() {
  const [token, setToken] = useState<null | (typeof tokens)[0]>(null)

  useEffect(() => {
    setToken(tokens[Math.floor(Math.random() * 50)])
  }, [])

  return (
    <AuctionProvider>
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
          <AuctionSidebar flex={3} />
        </Flex>
      </FullPageTemplate>
    </AuctionProvider>
  )
}
