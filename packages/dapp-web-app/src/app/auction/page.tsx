'use client'

import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  List,
  ListItem,
  TextProps,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tr,
  TableCellProps,
  InputLeftAddon,
} from '@chakra-ui/react'
import Link from 'next/link'
import ChakraNextImageLoader from 'components/ChakraNextImageLoader'
import FullPageTemplate from 'components/Templates/FullPage'
import { tokens } from 'data/tokens'
import { getExternalOpenseaUrl } from 'utils/getLink'
import { auctionAddress } from 'web3/contract-functions'
import { ReactNode } from 'react'

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
    <Text>{children}</Text>
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

const TableCell = ({
  children,
  ...props
}: TableCellProps & { children: ReactNode }) => (
  <Td py={2} px={0} {...props}>
    <Text as={'div'}>{children}</Text>
  </Td>
)

const TableRow = ({
  index,
  amount,
  address,
  isHighlighted,
}: {
  index?: number
  amount: number
  address: string
  isHighlighted?: boolean
}) => (
  <Tr
    fontWeight={isHighlighted ? 'bold' : 'normal'}
    textDecor={!index ? 'line-through' : undefined}
  >
    <TableCell width={'35px'} pr={2}>
      {!index ? '0' : index + '.'}
    </TableCell>
    <TableCell width={'100px'}>
      <Text as={'span'} fontSize={'10px'} mr={2}>
        Ξ
      </Text>
      {amount}
    </TableCell>
    <TableCell>{address}</TableCell>
  </Tr>
)

export default function Auction() {
  const token = tokens[0]
  return (
    <FullPageTemplate>
      <Box>
        <Box width={'500px'} mx={'auto'}>
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
          <Flex w="full" justifyContent={'space-between'} mt={'10px'}>
            <Text>{token.name}</Text>
            <ChakraLink
              as={Link}
              target="_blank"
              href={getExternalOpenseaUrl(auctionAddress, token.id.toString())}
            >
              view collection
            </ChakraLink>
          </Flex>
        </Box>
      </Box>
      <Flex justifyContent={'space-between'} w="full" gap={10} mt={8}>
        <Flex flexDir={'column'} gap={10}>
          <Box as="section">
            <Text as={'h1'} fontSize={'4xl'}>
              1/1 edition
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
                    April 18, 2024 at 10:00 a.m. PT / 01:00 p.m. ET
                  </Text>
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    End date:
                  </Text>{' '}
                  <Text as={'span'}>
                    April 18, 2024 at 11:00 a.m. PT / 02:00 p.m. ET
                  </Text>
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Bidding start price:
                  </Text>{' '}
                  <Text as={'span'}>0.06 ETH</Text>
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Supply:
                  </Text>{' '}
                  <Text as={'span'}>50 artworks</Text>
                </ListItem>
                <ListItem>
                  <Text as={'span'} fontWeight={'bold'}>
                    Creator’s fee:
                  </Text>{' '}
                  <Text as={'span'}>5%</Text>
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
                Overview The top 50 bids will secure a unique piece of art. We
                encourage our collectors to engage actively, as there is no
                limit to the number of bids you can place. Additionally, the
                more you bid, the higher your chances of winning multiple
                pieces.
              </Text>
            </SubTextSection>
            <SubTextSection title="Bidding">
              <Text>
                Please note that once you place a bid, it is final and cannot be
                altered. We advise all our collectors to bid carefully and
                consider their choices thoughtfully. This rule ensures fairness
                and integrity in the auction process.
              </Text>
            </SubTextSection>
            <SubTextSection title="Rebate">
              <Text>
                In our auction, fairness is key. If you are among the top 50
                winners and your bid exceeds the lowest winning bid in this
                group, you will receive a rebate. This rebate equals the
                difference between your bid and the lowest winning bid, ensuring
                that all winners pay the same final amount for their art pieces.
              </Text>
            </SubTextSection>
            <SubTextSection title="Non-winning bids">
              <Text>
                At the conclusion of the auction, non-winning participants are
                eligible to claim a full refund of their bid amounts. This
                process is straightforward and ensures that if you don’t win,
                you can retrieve your investment without any hassle.
              </Text>
            </SubTextSection>
            <Text fontSize={'sm'} mt={10}>
              This auction format is designed to be engaging and fair, offering
              equal footing for all participants and a straightforward process
              for both winning and retrieving funds for non-winners.
            </Text>
          </Box>
        </Flex>
        <Flex
          as={'section'}
          flexDir={'column'}
          gap={8}
          px={8}
          py={6}
          border={'1px solid black'}
          bgColor={'white'}
          w={'full'}
        >
          <Box>
            <Text as={'span'} fontWeight={'bold'}>
              remaining time:
            </Text>{' '}
            <Text as={'span'}>4d 19h 32m 42s</Text>
          </Box>
          <Flex flexDir={'column'} gap={4}>
            <Text fontWeight={'bold'}>lowest winning bid</Text>
            <Text>
              <Text as={'span'} fontSize={'xs'}>
                Ξ
              </Text>{' '}
              0.209
            </Text>
            <Button
              variant={'link'}
              textDecor={'underline'}
              colorScheme="blackAlpha"
              fontWeight={'normal'}
              border={0}
              w={'min-content'}
              display={'inline-block'}
            >
              80 bids
            </Button>
          </Flex>
          <Flex justifyContent={'space-between'} gap={2}>
            <InputGroup variant={'unstyled'}>
              <InputLeftAddon fontSize={'12px'} pt={1}>
                Ξ
              </InputLeftAddon>
              <Input
                placeholder="0.219 or more"
                size={'md'}
                colorScheme="blackAlpha"
              />
            </InputGroup>
            <Button variant={'solid'} size={'md'} px={8}>
              place bid
            </Button>
          </Flex>
          <Box>
            <Text fontWeight={'bold'}>top 50 bids</Text>
            <TableContainer mt={1} maxH={'260px'} overflowY={'auto'}>
              <Table variant="simple" size={'sm'} textColor={'gray.500'}>
                <Tbody>
                  <TableRow index={1} amount={6.699} address={'punk5273'} />
                  <TableRow
                    index={2}
                    amount={3.02}
                    address={'you'}
                    isHighlighted
                  />
                  <TableRow index={3} amount={2.0} address={'thearod.eth'} />
                  <TableRow
                    index={4}
                    amount={0.699}
                    address={'arodstudio.eth'}
                  />
                  <TableRow
                    index={5}
                    amount={0.1}
                    address={'you'}
                    isHighlighted
                  />
                </Tbody>
              </Table>
            </TableContainer>
            <Button
              variant={'link'}
              textDecor={'underline'}
              colorScheme="blackAlpha"
              fontWeight={'normal'}
              border={0}
              mt={4}
              w={'min-content'}
              display={'inline-block'}
            >
              view all
            </Button>
          </Box>
          <Box>
            <Text fontWeight={'bold'}>your bids</Text>
            <TableContainer mt={1} maxH={'260px'} overflowY={'auto'}>
              <Table variant="simple" size={'sm'} textColor={'gray.500'}>
                <Tbody>
                  <TableRow index={2} amount={3.02} address={'you'} />
                  <TableRow amount={0.1} address={'you'} />
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <Text as={'div'} fontSize={'xs'}>
            Claim refund, rebate and artwork will be opened after auction ends.{' '}
            <ChakraLink as={Link} href={'/about#faq'}>
              Read more
            </ChakraLink>
            .
          </Text>
        </Flex>
      </Flex>
    </FullPageTemplate>
  )
}
