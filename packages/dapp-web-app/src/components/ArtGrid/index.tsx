import { Box, Flex, Skeleton, useBreakpointValue } from '@chakra-ui/react'
import ChakraNextImageLoader from 'components/ChakraNextImageLoader'
import { useAuctionContext } from 'contexts/AuctionContext'
import { tokens } from 'data/tokens'
import Link from 'next/link'
import { useMemo } from 'react'
import { getSmallTokenPath } from 'utils/tokens'
import { useReadGlitchGetAllTokensVersion } from 'web3/contract-functions'

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
  const divisor = useBreakpointValue(
    { base: 40, sm: 18, md: 15, lg: 12 },
    { ssr: true, fallback: 'base' },
  )

  if (!divisor || isLoading || version === '') {
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
export const ArtGrid = ({
  displayTokensIds,
}: {
  displayTokensIds?: number[]
}) => {
  const { burnedTokensIds, isLoadingBurnedCall } = useAuctionContext()
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
  console.log('displayTokensIds', displayTokensIds)
  const tokensHandled = useMemo(() => {
    if (!displayTokensIds) return randomTokens
    return randomTokens.filter((token) => displayTokensIds.includes(token.id))
  }, [displayTokensIds])

  return (
    <Flex
      as={'main'}
      flexDir={'row'}
      flexWrap={'wrap'}
      justifyContent={'flex-start'}
      alignContent={'flex-start'}
    >
      {tokensHandled.map(
        (token) =>
          !burnedTokensIds.includes(token.id) && (
            <TokenPreview
              key={token.id}
              token={token}
              version={tokensVersionByIndex[token.id] ?? ''}
              isLoading={isLoading || isLoadingBurnedCall}
            />
          ),
      )}
    </Flex>
  )
}

export default ArtGrid
