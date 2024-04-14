'use client'

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
  Skeleton,
  Tooltip,
  useDisclosure,
  CloseButton,
  Modal,
  ModalContent,
  ModalOverlay,
  useMediaQuery,
  HeadingProps,
  ModalFooter,
} from '@chakra-ui/react'
import ChakraNextImageLoader from 'components/ChakraNextImageLoader'
import { EtherSymbol } from 'components/EtherSymbol'
import { tokens } from 'data/tokens'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ReactNode, useMemo } from 'react'
import { getExternalOpenseaUrl } from 'utils/getLink'
import { formatToEtherStringBN } from 'utils/price'
import { getFullTokenPath, getSmallTokenPath } from 'utils/tokens'
import { useAccount } from 'wagmi'
import {
  glitchAddress,
  useReadGlitchGetTokenVersion,
  useReadGlitchOwnerOf,
  useReadGlitchRefreshTokenPrice,
  useWriteGlitchRefreshToken,
} from 'web3/contract-functions'
import { BurnModal } from './BurnModal'
import { useAuctionContext } from 'contexts/AuctionContext'
import ForceConnectButton from 'components/ForceConnectButton'

const Section = ({
  title = '',
  children,
  titleProps = {},
}: {
  title: string
  children: ReactNode
  titleProps?: HeadingProps
}) => (
  <Box as={'section'}>
    <Heading
      as={'h2'}
      fontSize={'lg'}
      fontWeight={'bold'}
      pt={8}
      pb={2}
      {...titleProps}
    >
      {title}
    </Heading>
    <Text as={'div'}>{children}</Text>
  </Box>
)

export default function StaticToken({ id }: { id?: number }) {
  const token = tokens.find((token) => token.id === id)
  const version = 'A'

  if (!token || !id) {
    redirect('/')
  }

  return (
    <Flex
      flexDir={{ base: 'column', md: 'row' }}
      justifyContent={'center'}
      gap={10}
    >
      <Flex flexDir={'column'} alignItems={'center'} justifyContent={'top'}>
        <ChakraLink
          as={Link}
          target="_blank"
          href={getFullTokenPath(token.filename, version)}
          display={'block'}
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
        </ChakraLink>
      </Flex>
      <Flex flexDir={'column'} alignItems={'flex-start'} flex={9} gap={10}>
        <header>
          <Heading as={'h1'} p={0} fontSize={'2xl'}>
            {token.name}
          </Heading>
          <Box fontSize={'md'} p={0}>
            <ChakraLink
              as={Link}
              target="_blank"
              href={getFullTokenPath(token.filename, version)}
              display={'block'}
            >
              view actual size
            </ChakraLink>
          </Box>
        </header>
        <section>
          <Heading as={'h3'} fontSize={'lg'} fontWeight={'bold'} pt={0}>
            metadata
          </Heading>
          <Flex gap={4} flexWrap={'wrap'}>
            {Object.entries(token.metadata).map(([key, value]) => (
              <Box key={key} mr={6}>
                <Text as={'span'} fontWeight="bold">
                  {key}:{' '}
                </Text>
                <Text as={'span'}>
                  {typeof value !== 'string' ? value.toString() : value}
                </Text>
              </Box>
            ))}
          </Flex>
        </section>
      </Flex>
    </Flex>
  )
}
