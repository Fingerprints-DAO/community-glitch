import { Box, Flex } from '@chakra-ui/react'
import ChakraNextImageLoader from 'components/ChakraNextImageLoader'
import { tokens } from 'data/tokens'

const divisor = 12
const randomTokens = tokens.sort(() => Math.random() - 0.5)
export const ArtGrid = () => {
  return (
    <Flex
      as={'main'}
      flexDir={'row'}
      flexWrap={'wrap'}
      justifyContent={'flex-start'}
      alignContent={'flex-start'}
    >
      {randomTokens.map((token) => (
        <Box key={token.filename} maxW={token.width / divisor}>
          <ChakraNextImageLoader
            src={`/arts/A/${token.filename}`}
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
