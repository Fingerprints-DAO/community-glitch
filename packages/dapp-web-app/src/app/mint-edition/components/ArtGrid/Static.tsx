'use client'
import {
  Box,
  Flex,
  FlexProps,
  Skeleton,
  useBreakpointValue,
} from '@chakra-ui/react'
import ChakraNextImageLoader from 'components/ChakraNextImageLoader'
import { useMintEditionContext } from 'contexts/MintEditionContext'
import { tokens } from 'data/tokens'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { getSmallTokenPath } from 'utils/tokens'

const tokensByFilename = tokens.reduce(
  (acc: Record<string, (typeof tokens)[0]>, token) => {
    acc[token.filename] = token
    return acc
  },
  {},
)

export interface GridConfig {
  name: string
  image: string
  class: string
  version: string
}

const StaticTokenPreview = ({
  token,
  divisorOpt = { base: 40, sm: 18, md: 15, lg: 12 },
}: {
  token: (typeof tokensByFilename)[0] & GridConfig
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
        src={getSmallTokenPath(token.filename, token.version)}
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
  const { minted } = useMintEditionContext()
  const [tokensGrid, setTokensGrid] = useState<GridConfig[]>([])

  useEffect(() => {
    async function updateGrid() {
      const newGrid = await fetch(
        `/mint-edition/config/${Number(minted + 1n)}.json`,
      ).then((res) => res.json())

      setTokensGrid(newGrid)
    }

    updateGrid()
  }, [minted])

  return (
    <Flex
      as={'section'}
      flexDir={'row'}
      flexWrap={'wrap'}
      justifyContent={'flex-start'}
      alignContent={'flex-start'}
      {...props}
    >
      {tokensGrid.length > 0 &&
        tokensGrid.map((token) => (
          <StaticTokenPreview
            key={token.image}
            token={{
              ...tokensByFilename[token.image],
              ...token,
            }}
            divisorOpt={divisorOpt}
          />
        ))}
    </Flex>
  )
}

export default StaticArtGrid
