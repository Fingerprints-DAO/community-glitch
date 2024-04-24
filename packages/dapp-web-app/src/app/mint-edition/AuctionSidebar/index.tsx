'use client'
import {
  Box,
  Link as ChakraLink,
  Text,
  Flex,
  SkeletonText,
  FlexProps,
  TextProps,
  List,
  ListItem,
} from '@chakra-ui/react'
import Link from 'next/link'
import useCountdownTime from 'hooks/use-countdown-timer'
import Countdown from 'components/Countdown'
import { useAuctionContext } from 'contexts/AuctionContext'
import { SalesState } from 'types/auction'
import { getContractAddressesForChainOrThrow } from '@dapp/sdk'
import { getChainId } from 'utils/chain'
import dayjs from 'dayjs'
import { ReactNode } from 'react'
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
    <Text as={'h2'} fontSize={'xl'} fontWeight={'bold'} mb={4} {...props}>
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

const getCountdownText = (state: SalesState) => {
  if (state === SalesState.ENDED) {
    return 'mint ended'
  }
  if (state === SalesState.STARTED) {
    return 'remaining time: '
  }
  return 'mint starts in: '
}

const salesConfig = {
  startTime: dayjs(1714323600000),
  endTime: dayjs(1714924740000),
  salesState: SalesState.NOT_STARTED,
}
export const AuctionSidebar = (props: FlexProps) => {
  const { auctionState } = useAuctionContext()
  const { countdownInMili } = useCountdownTime(salesConfig)
  return (
    <Flex
      as={'section'}
      px={8}
      py={6}
      border={'1px solid black'}
      bgColor={'white'}
      w={'full'}
      {...props}
    >
      <SkeletonText
        as={'div'}
        rounded={'none'}
        noOfLines={8}
        skeletonHeight={'10px'}
        isLoaded={auctionState !== SalesState.IDLE}
        fadeDuration={0.6}
      >
        <Flex flexDir={'column'} gap={8} w={'full'}>
          <Box>
            <Text as={'span'} fontWeight={'bold'}>
              {getCountdownText(auctionState)}
            </Text>{' '}
            <Text as={'span'}>
              <Countdown timestampInMili={countdownInMili} />
            </Text>
          </Box>
          <Flex flexDir={'column'} gap={10}>
            <Box as={'section'}>
              <TextSection title="details">
                <List>
                  <ListItem mb={2}>
                    <Text as={'span'} fontWeight={'bold'}>
                      start date:
                    </Text>{' '}
                    <Text as={'span'}>
                      sunday, april 28 at 1pm edt / 7pm cest
                    </Text>
                  </ListItem>
                  <ListItem mb={2}>
                    <Text as={'span'} fontWeight={'bold'}>
                      end date:
                    </Text>{' '}
                    <Text as={'span'}>
                      sunday, may 5 11:59pm edt / monday, may 6, 5:59am cest
                    </Text>
                  </ListItem>
                  <ListItem mb={2}>
                    <Text as={'span'} fontWeight={'bold'}>
                      price:
                    </Text>{' '}
                    <Text as={'span'}>
                      0.025 <EtherSymbol />
                    </Text>
                  </ListItem>
                  <ListItem mb={2}>
                    <Text as={'span'} fontWeight={'bold'}>
                      creator&apos;s fee:
                    </Text>{' '}
                    <Text as={'span'}>5%</Text>
                  </ListItem>
                  <ListItem mb={2}>
                    <Text as={'span'} fontWeight={'bold'}>
                      supply:
                    </Text>{' '}
                    <Text as={'span'}>510 artworks</Text>
                  </ListItem>
                  <ListItem mb={2}>
                    <Text as={'span'} fontWeight={'bold'}>
                      blockchain:
                    </Text>{' '}
                    <Text as={'span'}>ethereum</Text>
                  </ListItem>
                </List>
                <Text mt={4}>
                  glitch by misha de ridder, released by Fingerprints, is a
                  collection of 50 animated GIFs, stemming from photographs of
                  erased graffiti. The act of erasing can involve both
                  destruction and generation, transformation and reimagination —
                  allowing for new possibilities to emerge.
                </Text>
                <Text mt={4}>
                  As soon as the 1/1 auction closes, a limited mint of 510
                  editions will become available. The edition piece is a
                  randomized composite image of all 50 animations, each
                  representing one of the many possible options of the full
                  collection mosaic, minted as HTML-page. The mint is limited to
                  510 editions. The art is slowly degraded as more editions are
                  minted following the steps of the 1/1s — until the last 20
                  editions are fully degraded. There&apos;s no way to restore,
                  what you mint is what you get.
                </Text>
              </TextSection>
            </Box>
          </Flex>
        </Flex>
      </SkeletonText>
    </Flex>
  )
}
