'use client'
import {
  Box,
  Flex,
  FlexProps,
  Skeleton,
  useBreakpointValue,
} from '@chakra-ui/react'
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
  divisorOpt = { base: 40, sm: 18, md: 15, lg: 12 },
}: {
  token: (typeof tokens)[0]
  version: string
  divisorOpt?: Partial<Record<string, number>>
}) => {
  const divisor = useBreakpointValue(divisorOpt, {
    ssr: true,
    fallback: 'base',
  })

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
export const StaticArtGrid = ({
  divisorOpt,
  ...props
}: FlexProps & { divisorOpt?: Partial<Record<string, number>> }) => {
  return (
    <Flex
      as={'section'}
      flexDir={'row'}
      flexWrap={'wrap'}
      justifyContent={'flex-start'}
      alignContent={'flex-start'}
      {...props}
    >
      {randomTokens.map((token) => (
        <StaticTokenPreview
          key={token.id}
          token={token}
          version={'A'}
          divisorOpt={divisorOpt}
        />
      ))}
    </Flex>
  )
}

export default StaticArtGrid
