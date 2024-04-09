'use client'

import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  Heading,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react'
import ChakraNextImageLoader from 'components/ChakraNextImageLoader'
import FullPageTemplate from 'components/Templates/FullPage'
import { tokens } from 'data/tokens'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getExternalOpenseaUrl } from 'utils/getLink'
import { getSmallTokenPath } from 'utils/tokens'

export default function Token({ params: { id } }: { params: { id: string } }) {
  const token = tokens.find((token) => token.id === Number(id))

  if (!token) {
    redirect('/')
  }

  return (
    <FullPageTemplate>
      <Flex
        flexDir={'row'}
        // alignItems={'stretch'}
        justifyContent={'center'}
        gap={10}
      >
        <Flex
          flexDir={'column'}
          alignItems={'center'}
          justifyContent={'center'}
        >
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
        </Flex>
        <Flex flexDir={'column'} alignItems={'flex-start'} flex={1} gap={10}>
          <header>
            <Heading as={'h1'} p={0} fontSize={'2xl'}>
              {token.name}
            </Heading>
            <Heading as={'h2'} fontSize={'md'} p={0}>
              token #{token.id} -{' '}
              <ChakraLink
                as={Link}
                target="_blank"
                href={getExternalOpenseaUrl('0x0000', token.id.toString())}
              >
                buy on opensea
              </ChakraLink>
            </Heading>
          </header>
          <Text p={0}>
            Long text about Lorem ipsum dolor sit amet, consectetur adipiscing
            elit. Pellentesque consequat egestas risus ac consequat. Mauris
            pulvinar neque et tellus suscipit dictum. Suspendisse nec dui
            aliquet, dignissim ligula nec, blandit enim. Pellentesque nec nunc
            dapibus, vehicula felis et, tempor lacus. Morbi ultrices eget magna
            at n urpis, nec tristique risus. In pulvina Curabitur at ligula eu
            metus tincidunt ultricies. Maecenas nulla quam, eleifend vitae
            lectus ac, placerat feugiat justo. Curabitur semper, neque interdum
            auctor elementum, sapien urna blandit lacus, id scelerisque mauris
            nunc ut libero. Sed accumsan nisi condimentum aliquet volutpat.
            Mauris tempor euismod imperdiet. Pellentesque sit amet ligula vitae
            augue elementum lobortis nec id orci. Quisque finibus felis arcu, eu
            imperdiet augue tincidunt quis.
          </Text>
          <section>
            <Heading as={'h3'} fontSize={'lg'} fontWeight={'bold'} pt={0}>
              metadata
            </Heading>
            <Grid
              templateColumns={{
                base: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(4, 1fr)',
              }}
              gap={4}
            >
              <GridItem>
                <Text as={'span'} fontWeight="bold">
                  version:{' '}
                </Text>
                <Text as={'span'}>A</Text>
              </GridItem>
              {Object.entries(token.metadata).map(([key, value]) => (
                <GridItem key={key}>
                  <Text as={'span'} fontWeight="bold">
                    {key}:{' '}
                  </Text>
                  <Text as={'span'}>
                    {typeof value !== 'string' ? value.toString() : value}
                  </Text>
                </GridItem>
              ))}
            </Grid>
          </section>
          <Flex as={ButtonGroup} w={'full'}>
            <Box flex={1} textAlign={'center'}>
              <Button w="full" mb={1}>
                refresh token
              </Button>
              <ChakraLink as={Link} fontSize={'xs'} href={'/about#faq'}>
                learn more
              </ChakraLink>
            </Box>
            <Box flex={1} textAlign={'center'}>
              <Button w="full" mb={1} variant={'outline'}>
                burn to print
              </Button>
              <ChakraLink as={Link} fontSize={'xs'} href={'/about#faq'}>
                learn more
              </ChakraLink>
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </FullPageTemplate>
  )
}
