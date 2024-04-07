'use client'
import { Box, Flex } from '@chakra-ui/react'
import ChakraNextImageLoader from 'components/ChakraNextImageLoader'
import { tokens } from 'data/tokens'
import Link from 'next/link'
import { useMemo } from 'react'
import { useReadGlitchGetAllTokensVersion } from 'web3/contract-functions'

type TokensVersionByIndexType = {
  [key: number]: string // Assuming the value is a string, adjust as needed
}

const divisor = 12
const randomTokens = [...tokens].sort(() => Math.random() - 0.5)
export const ArtGrid = () => {
  const { data: tokensVersion = [] } = useReadGlitchGetAllTokensVersion()
  const tokensVersionByIndex: TokensVersionByIndexType = useMemo(
    () =>
      tokensVersion.reduce(
        (acc, version, index) => ({
          ...acc,
          [index]: version,
        }),
        {},
      ),
    [tokensVersion],
  )
  console.log(tokensVersionByIndex)

  return (
    <Flex
      as={'main'}
      flexDir={'row'}
      flexWrap={'wrap'}
      justifyContent={'flex-start'}
      alignContent={'flex-start'}
    >
      {randomTokens.map((token) => (
        <Box
          as={Link}
          href={`/gallery/${token.id}`}
          key={token.filename}
          maxW={token.width / divisor}
        >
          <ChakraNextImageLoader
            src={`/arts/${tokensVersionByIndex[token.id]}/${token.filename}`}
            alt={`${token.name}`}
            imageWidth={token.width}
            imageHeight={token.height}
            imageProps={{
              priority: true,
              unoptimized: true,
            }}
          />
        </Box>
      ))}
    </Flex>
  )
}

export default ArtGrid
