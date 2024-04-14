'use client'
import { Box, Flex, Skeleton, useBreakpointValue } from '@chakra-ui/react'
import ChakraNextImageLoader from 'components/ChakraNextImageLoader'
import { useAuctionContext } from 'contexts/AuctionContext'
import { tokens } from 'data/tokens'
import Link from 'next/link'
import { useMemo } from 'react'
import { getSmallTokenPath } from 'utils/tokens'
import { useReadGlitchGetAllTokensVersion } from 'web3/contract-functions'

const randomTokens = [...tokens].sort(() => Math.random() - 0.5)

const StaticTokenPreview = ({
  token,
  version,
}: {
  token: (typeof tokens)[0]
  version: string
}) => {
  const divisor = useBreakpointValue(
    { base: 40, sm: 18, md: 15, lg: 12 },
    { ssr: true, fallback: 'base' },
  )

  if (!divisor) {
    return <Skeleton w={'full'} h={'20px'} rounded={0} />
  }
  return (
    <Box
      as={Link}
      href={`/gallery/${token.id}`}
      maxW={`${token.width / divisor}px`}
      w={'100%'}
    >
      <ChakraNextImageLoader
        src={getSmallTokenPath(token.filename, version)}
        alt={`${token.name}`}
        imageWidth={token.width}
        imageHeight={token.height}
        imageProps={{
          priority: true,
          unoptimized: true,
        }}
      />
    </Box>
  )
}
export const StaticArtGrid = () => {
  return (
    <Flex
      as={'main'}
      flexDir={'row'}
      flexWrap={'wrap'}
      justifyContent={'flex-start'}
      alignContent={'flex-start'}
    >
      {randomTokens.map((token) => (
        <StaticTokenPreview key={token.id} token={token} version={'A'} />
      ))}
    </Flex>
  )
}

export default StaticArtGrid
