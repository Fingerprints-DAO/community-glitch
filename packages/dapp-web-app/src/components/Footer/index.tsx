import { useMemo } from 'react'
import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { FarcasterIcon, LensIcon } from 'components/Icons'
import { TextToltip } from 'components/TextTooltip'
import { BsDiscord, BsTwitterX } from 'react-icons/bs'
import { SiOpensea } from 'react-icons/si'
import { SiEthereum } from 'react-icons/si'
import { getExternalEtherscanUrl, getExternalOpenseaUrl } from 'utils/getLink'
import { glitchAddress } from 'web3/contract-functions'

const Footer = () => {
  const auctionIsEnded = useMemo(() => new Date().getTime() > 1714323600000, [])
  return (
    <Box as="footer" pt={14} pb={6} w={'auto'}>
      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        justifyContent={'space-between'}
        alignItems={{ base: 'center', md: 'stretch' }}
        gap={0}
      >
        <Box textAlign={{ base: 'center', md: 'left' }} textColor={'black'}>
          <Text fontSize={'md'}>
            by{' '}
            <Box
              as="a"
              href="https://www.mishaderidder.com/"
              target="_blank"
              _hover={{ textDecor: 'underline' }}
            >
              misha de ridder
            </Box>
            {' & '}
            <Box
              as="a"
              href="https://fingerprintsdao.xyz/"
              target="_blank"
              _hover={{ textDecor: 'underline' }}
            >
              fingerprints dao
            </Box>
            , in collaboration with{' '}
            <Box
              as="a"
              href="https://assembly.art/"
              target="_blank"
              _hover={{ textDecor: 'underline' }}
            >
              assembly
            </Box>
          </Text>{' '}
          <Text fontSize="xs" flex={1} mb={[2, 0]} mt={2}>
            developed by{' '}
            <Text
              as="a"
              color={'gray.500'}
              title="arod.studio"
              href="https://arod.studio"
              target="_blank"
              _hover={{ textDecor: 'underline' }}
            >
              arod.studio
            </Text>
          </Text>
        </Box>

        <Flex flex={1} justifyContent={'flex-end'} alignItems={'center'}>
          <TextToltip label="Check out on Lens" placement="top">
            <Box
              as="a"
              href="https://hey.xyz/u/mishaderidder"
              title="Lens protocol"
              target="_blank"
              p={2}
              color="gray.300"
              _hover={{ color: 'gray.800' }}
              transition="ease"
              transitionProperty="color"
              transitionDuration="0.2s"
            >
              <Icon as={LensIcon} w={8} h={8} display="block" />
            </Box>
          </TextToltip>
          <TextToltip label="Check out on Farcaster" placement="top">
            <Box
              as="a"
              href="https://warpcast.com/mishaderidder.eth"
              title="Farcaster"
              target="_blank"
              p={2}
              color="gray.300"
              _hover={{ color: 'gray.800' }}
              transition="ease"
              transitionProperty="color"
              transitionDuration="0.2s"
            >
              <Icon as={FarcasterIcon} w={6} h={6} display="block" />
            </Box>
          </TextToltip>
          <TextToltip label="Check out on X" placement="top">
            <Box
              as="a"
              href="https://twitter.com/FingerprintsDAO"
              title="X"
              target="_blank"
              p={2}
              color="gray.300"
              _hover={{ color: 'gray.800' }}
              transition="ease"
              transitionProperty="color"
              transitionDuration="0.2s"
            >
              <Icon as={BsTwitterX} w={6} h={6} display="block" />
            </Box>
          </TextToltip>
          <TextToltip label="Join us on Discord" placement="top">
            <Box
              as="a"
              href={
                'https://discord.com/invite/Mg7wx36upM?utm_content=bufferbaa79&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer'
              }
              title="Discord"
              target="_blank"
              p={2}
              color="gray.300"
              _hover={{ color: 'gray.800' }}
              transition="ease"
              transitionProperty="color"
              transitionDuration="0.2s"
            >
              <Icon as={BsDiscord} w={6} h={6} display="block" />
            </Box>
          </TextToltip>
          {glitchAddress && (
            <>
              <TextToltip label="Check out on Etherscan" placement="top">
                <Box
                  as="a"
                  href={getExternalEtherscanUrl(glitchAddress)}
                  title="etherscan"
                  target="_blank"
                  p={2}
                  color="gray.300"
                  _hover={{ color: 'gray.800' }}
                  transition="ease"
                  transitionProperty="color"
                  transitionDuration="0.2s"
                >
                  <Icon as={SiEthereum} w={6} h={6} display="block" />
                </Box>
              </TextToltip>
              {auctionIsEnded && (
                <TextToltip
                  label="Check out the collection on Opensea"
                  placement="top"
                >
                  <Box
                    as="a"
                    href={getExternalOpenseaUrl(glitchAddress)}
                    title="OpenSea"
                    target="_blank"
                    p={2}
                    color="gray.300"
                    _hover={{ color: 'gray.800' }}
                    transition="ease"
                    transitionProperty="color"
                    transitionDuration="0.2s"
                  >
                    <Icon as={SiOpensea} w={6} h={6} display="block" />
                  </Box>
                </TextToltip>
              )}
            </>
          )}
        </Flex>
      </Flex>
    </Box>
  )
}

export default Footer
