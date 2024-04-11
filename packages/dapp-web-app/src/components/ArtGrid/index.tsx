import { Box, Flex, Skeleton } from '@chakra-ui/react'
import ChakraNextImageLoader from 'components/ChakraNextImageLoader'
import { tokens } from 'data/tokens'
import Link from 'next/link'
import { useMemo } from 'react'
import { getSmallTokenPath } from 'utils/tokens'
import { useReadGlitchGetAllTokensVersion } from 'web3/contract-functions'

const divisor = 12
const randomTokens = [...tokens].sort(() => Math.random() - 0.5)

type TokensVersionByIndexType = {
  [key: number]: string // Assuming the value is a string, adjust as needed
}

const TokenPreview = ({
  token,
  version,
  isLoading,
}: {
  token: (typeof tokens)[0]
  version: string
  isLoading: boolean
}) => {
  if (isLoading || version === '') {
    return <Skeleton w={'full'} h={'80vh'} rounded={0} />
  }
  return (
    <Box
      as={Link}
      href={`/gallery/${token.id}`}
      maxW={token.width / divisor}
      w={'100%'}
    >
      {version === 'D' && (
        <Box as={'span'} bgColor={'white'} w={'full'} h={'100%'} />
      )}
      {version !== 'D' && (
        <ChakraNextImageLoader
          src={getSmallTokenPath(token.filename, version)}
          alt={`${token.name}`}
          imageWidth={token.width / divisor}
          imageHeight={token.height / divisor}
          imageProps={{
            priority: true,
            unoptimized: true,
          }}
        />
      )}
    </Box>
  )
}
export const ArtGrid = () => {
  const { data: tokensVersion = [], isLoading } =
    useReadGlitchGetAllTokensVersion()
  const tokensVersionByIndex: TokensVersionByIndexType = useMemo(
    () =>
      tokensVersion.reduce(
        (acc, version, index) => ({
          ...acc,
          [index + 1]: version,
        }),
        {},
      ),
    [tokensVersion],
  )

  return (
    <Flex
      as={'main'}
      flexDir={'row'}
      flexWrap={'wrap'}
      justifyContent={'flex-start'}
      alignContent={'flex-start'}
    >
      {randomTokens.map((token) => (
        <TokenPreview
          key={token.id}
          token={token}
          version={tokensVersionByIndex[token.id] ?? ''}
          isLoading={isLoading}
        />
      ))}
    </Flex>
  )
}

export default ArtGrid
