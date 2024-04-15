'use client'

import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  List,
  ListItem,
  TextProps,
  Skeleton,
} from '@chakra-ui/react'
import Link from 'next/link'
import ChakraNextImageLoader from 'components/ChakraNextImageLoader'
import FullPageTemplate from 'components/Templates/FullPage'
import { tokens } from 'data/tokens'
import { ReactNode, useEffect, useState } from 'react'
import { AuctionProvider } from 'contexts/AuctionContext'
import { AuctionSidebar } from './components/AuctionSidebar'
import { getSmallTokenPath } from 'utils/tokens'
import { EtherSymbol } from 'components/EtherSymbol'

const TextSection = ({
  title,
  children,
  ...props
}: {
  title: string
  children: ReactNode
  props?: TextProps
}) => (
  <>
    <Text as={'h2'} fontSize={'xl'} fontWeight={'bold'} {...props}>
      {title}
    </Text>
    <Text as={'div'}>{children}</Text>
  </>
)

const SubTitle = ({
  children,
  ...props
}: {
  children: ReactNode
  props?: TextProps
}) => (
  <Text as={'h3'} fontSize={'lg'} fontWeight={'bold'} mt={4} {...props}>
    {children}
  </Text>
)
const SubTextSection = ({
  title,
  children,
  ...props
}: {
  title: string
  children: ReactNode
  props?: TextProps
}) => (
  <>
    <SubTitle {...props}>{title}</SubTitle>
    <Text as={'div'} fontSize={'md'}>
      {children}
    </Text>
  </>
)

export default function Auction() {
  const [token, setToken] = useState<null | (typeof tokens)[0]>(null)

  useEffect(() => {
    setToken(tokens[Math.floor(Math.random() * 50)])
  }, [])

  return (
    <AuctionProvider>
      <FullPageTemplate>
        <Box>
          <Skeleton
            isLoaded={token !== null}
            w={'450px'}
            h={token === null ? '450px' : ''}
            mx={'auto'}
            maxW={'100%'}
          >
            {token !== null && (
              <>
                <ChakraNextImageLoader
                  src={getSmallTokenPath(token.filename, 'A')}
                  alt={`${token.name}`}
                  imageWidth={token.width}
                  imageHeight={token.height}
                  imageProps={{
                    priority: true,
                    unoptimized: true,
                  }}
                />
                <Flex
                  w="full"
                  justifyContent={'space-between'}
                  mt={'10px'}
                  flexWrap={'wrap'}
                >
                  <Text>{token.name}</Text>
                  <ChakraLink
                    as={Link}
                    href={'/'}
                    // target="_blank"
                    // href={getExternalOpenseaUrl(auctionAddress)}
                  >
                    view collection
                  </ChakraLink>
                </Flex>
              </>
            )}
          </Skeleton>
        </Box>
        <Flex
          flexDir={{ base: 'column-reverse', md: 'row' }}
          alignItems={'flex-start'}
          justifyContent={'space-between'}
          w="full"
          gap={10}
          mt={8}
        >
          <Flex flexDir={'column'} gap={10}>
            <Box as="section">
              <Text as={'h1'} fontSize={'4xl'}>
                1/1 auction
              </Text>
              <Text>ranked auction with rebate</Text>
            </Box>
            <Box as={'section'}>
              <TextSection title="Details">
                <List>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Start date:
                    </Text>{' '}
                    <Text as={'span'}>
                      Thursday, April 25 at 1 PM EDT / 7pm CEST
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      End date:
                    </Text>{' '}
                    <Text as={'span'}>
                      Sunday, April 28 at 1 PM EDT / 7pm CEST
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Bidding start price:
                    </Text>{' '}
                    <Text as={'span'}>
                      0.04 <EtherSymbol />
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Minimum increase bid:
                    </Text>{' '}
                    <Text as={'span'}>
                      0.005 <EtherSymbol />
                    </Text>
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Supply:
                    </Text>{' '}
                    <Text as={'span'}>50 artworks</Text>
                  </ListItem>
                  <ListItem>
                    <Text as={'span'} fontWeight={'bold'}>
                      Blockchain:
                    </Text>{' '}
                    <Text as={'span'}>Ethereum</Text>
                  </ListItem>
                </List>
              </TextSection>
            </Box>
            <Box as={'section'}>
              <TextSection title="Description">
                50 photos of erased graffiti are animated to gifs by inserting
                liminal afterimages of what was: faces, text, indecipherable
                symbols. A series of abstract painting-like images blurring the
                border between photography, painting and digital image and
                animation. Information that has been erased becomes information
                again.
              </TextSection>
            </Box>
            <Box as={'section'}>
              <TextSection title="Auction">
                Here&apos;s what you need to know:
              </TextSection>
              <SubTextSection title="Overview">
                <Text>
                  The top 50 bids will secure a unique piece of art. We
                  encourage our collectors to engage actively, as there is no
                  limit to the number of bids you can place. Additionally, the
                  more you bid, the higher your chances of winning multiple
                  pieces.
                </Text>
              </SubTextSection>
              <SubTextSection title="Bidding">
                <Text>
                  Please note that once you place a bid, it is final and cannot
                  be altered. We advise all our collectors to bid carefully and
                  consider their choices thoughtfully. This rule ensures
                  fairness and integrity in the auction process.
                </Text>
              </SubTextSection>
              <SubTextSection title="Rebate">
                <Text>
                  In our auction, fairness is key. If you are among the top 50
                  winners and your bid exceeds the lowest winning bid in this
                  group, you will receive a rebate. This rebate equals the
                  difference between your bid and the lowest winning bid,
                  ensuring that all winners pay the same final amount for their
                  art pieces.
                </Text>
              </SubTextSection>
              <SubTextSection title="Non-winning bids">
                <Text>
                  At the conclusion of the auction, non-winning participants are
                  eligible to claim a full refund of their bid amounts. This
                  process is straightforward and ensures that if you don&apos;t
                  win, you can retrieve your investment without any hassle.
                </Text>
              </SubTextSection>
              <Text fontSize={'sm'} mt={10}>
                This auction format is designed to be engaging and fair,
                offering equal footing for all participants and a
                straightforward process for both winning and retrieving funds
                for non-winners.
              </Text>
            </Box>
          </Flex>
          <AuctionSidebar />
        </Flex>
      </FullPageTemplate>
    </AuctionProvider>
  )
}
