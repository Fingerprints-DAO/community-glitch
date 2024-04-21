'use client'

import { Box, Text, Link as ChakraLink } from '@chakra-ui/react'
import FullPageTemplate from 'components/Templates/FullPage'
import { AuctionProvider } from 'contexts/AuctionContext'
import dynamic from 'next/dynamic'
import { useAccount } from 'wagmi'
import Link from 'next/link'
import {
  glitchAddress,
  useReadGlitchGetTokensByOwner,
} from 'web3/contract-functions'
import { SalesState } from 'types/auction'
import { getExternalOpenseaUrl } from 'utils/getLink'

const DynamicArtGrid = dynamic(() => import('components/ArtGrid'), {
  ssr: false,
})

const NoTokensToDisplay = ({ auctionState }: { auctionState: SalesState }) => (
  <Box>
    <Text fontSize={'xl'} my={10}>
      You don&apos;t have any NFTs yet.
    </Text>
    {auctionState === SalesState.ENDED && (
      <ChakraLink
        as={Link}
        target="_blank"
        href={getExternalOpenseaUrl(glitchAddress)}
        display={'block'}
      >
        buy on opensea
      </ChakraLink>
    )}
    {auctionState !== SalesState.ENDED && (
      <ChakraLink as={Link} href={'/one-one-auction'} display={'block'}>
        bid to mint
      </ChakraLink>
    )}
  </Box>
)

export default function MyTokens() {
  const account = useAccount()
  const { data: tokens = [] } = useReadGlitchGetTokensByOwner({
    args: [account?.address!],
  })

  console.log(tokens)
  return (
    <FullPageTemplate>
      <AuctionProvider>
        {tokens.length < 1 && (
          <NoTokensToDisplay auctionState={SalesState.ENDED} />
        )}
        {tokens.length > 0 && (
          <>
            <Text as={'h2'} fontSize={'xl'} fontWeight={'bold'} mb={4}>
              1/1 edition
            </Text>
            <DynamicArtGrid displayTokensIds={tokens.map(Number)} />
          </>
        )}
      </AuctionProvider>
    </FullPageTemplate>
  )
}
