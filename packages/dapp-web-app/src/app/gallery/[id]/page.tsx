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
import FullPageTemplate from 'components/Templates/FullPage'
import { tokens } from 'data/tokens'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'
import { getExternalOpenseaUrl } from 'utils/getLink'
import { formatToEtherStringBN } from 'utils/price'
import { getSmallTokenPath } from 'utils/tokens'
import { useAccount } from 'wagmi'
import {
  glitchAddress,
  useReadGlitchGetTokenVersion,
  useReadGlitchOwnerOf,
  useReadGlitchRefreshTokenPrice,
  useWriteGlitchRefreshToken,
} from 'web3/contract-functions'
import { BurnModal } from './components/BurnModal'

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

export default function Token({ params: { id } }: { params: { id: string } }) {
  const token = tokens.find((token) => token.id === Number(id))
  const { data: version, isLoading } = useReadGlitchGetTokenVersion({
    args: [BigInt(token?.id ?? 0)],
  })
  const { data: refreshTokenPrice } = useReadGlitchRefreshTokenPrice()
  const { address: userAddress } = useAccount()
  const ownerOf = useReadGlitchOwnerOf({ args: [BigInt(token?.id ?? 0)] })
  const refreshToken = useWriteGlitchRefreshToken()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isMobile] = useMediaQuery('(max-width: 1023px)')

  if (!token) {
    redirect('/')
  }

  return (
    <FullPageTemplate>
      {isLoading && (
        <Flex>
          <Skeleton w={'full'} h={'80vh'} />
        </Flex>
      )}
      {!isLoading && (
        <Flex
          flexDir={{ base: 'column', md: 'row' }}
          justifyContent={'center'}
          gap={10}
        >
          <Flex
            flexDir={'column'}
            alignItems={'center'}
            justifyContent={'top'}
            bgColor={version === 'D' ? 'white' : ''}
            flex={!version || version === 'D' ? 3 : ''}
          >
            {version && version !== 'D' && (
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
            )}
          </Flex>
          <Flex flexDir={'column'} alignItems={'flex-start'} flex={9} gap={10}>
            <header>
              <Heading as={'h1'} p={0} fontSize={'2xl'}>
                {token.name}
              </Heading>
              <Heading as={'h2'} fontSize={'md'} p={0}>
                <ChakraLink
                  as={Link}
                  target="_blank"
                  href={getExternalOpenseaUrl(
                    glitchAddress,
                    token.id.toString(),
                  )}
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
              dapibus, vehicula felis et, tempor lacus. Morbi ultrices eget
              magna at n urpis, nec tristique risus. In pulvina Curabitur at
              ligula eu metus tincidunt ultricies. Maecenas nulla quam, eleifend
              vitae lectus ac, placerat feugiat justo. Curabitur semper, neque
              interdum auctor elementum, sapien urna blandit lacus, id
              scelerisque mauris nunc ut libero. Sed accumsan nisi condimentum
              aliquet volutpat. Mauris tempor euismod imperdiet. Pellentesque
              sit amet ligula vitae augue elementum lobortis nec id orci.
              Quisque finibus felis arcu, eu imperdiet augue tincidunt quis.
            </Text>
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
            <section>
              <Heading as={'h4'} fontSize={'md'} pt={0}>
                <b>price to refresh token:</b> <EtherSymbol fontSize={'8px'} />{' '}
                {formatToEtherStringBN(refreshTokenPrice)}
              </Heading>
            </section>
            <Flex as={ButtonGroup} w={'full'}>
              <Box flex={1} textAlign={'center'}>
                <Tooltip
                  hasArrow
                  bg="gray.300"
                  color="black"
                  label={"Token is not degraded, it can't be refreshed"}
                  isDisabled={version !== 'A'}
                  placement="top"
                >
                  <Button
                    w="full"
                    mb={1}
                    onClick={() =>
                      refreshToken.writeContract({
                        args: [BigInt(id)],
                        value: refreshTokenPrice,
                      })
                    }
                    isDisabled={version === 'A'}
                  >
                    refresh token
                  </Button>
                </Tooltip>
                <ChakraLink as={Link} fontSize={'xs'} href={'/about#faq'}>
                  learn more
                </ChakraLink>
              </Box>
              <Box flex={1} textAlign={'center'}>
                <Tooltip
                  hasArrow
                  bg="gray.300"
                  color="black"
                  placement="top"
                  label={'Only token owner can burn the token'}
                  isDisabled={
                    userAddress?.toLowerCase() === ownerOf.data?.toLowerCase()
                  }
                >
                  <Button
                    w="full"
                    mb={1}
                    variant={'outline'}
                    isDisabled={
                      userAddress?.toLowerCase() !== ownerOf.data?.toLowerCase()
                    }
                    onClick={onOpen}
                  >
                    burn to print
                  </Button>
                </Tooltip>
                <ChakraLink as={Link} fontSize={'xs'} href={'/about#prints'}>
                  learn more
                </ChakraLink>
              </Box>
              {isOpen && (
                <Modal
                  isCentered={true}
                  isOpen={true}
                  scrollBehavior={'outside'}
                  motionPreset={isMobile ? 'slideInBottom' : 'scale'}
                  onClose={onClose}
                  size={'2xl'}
                >
                  <ModalOverlay height="100vh" />
                  <ModalContent
                    bg="white"
                    position={{ base: 'fixed', sm: 'unset' }}
                    bottom={{ base: '0px', sm: 'unset' }}
                    mb={{ base: '0', sm: 'auto' }}
                    rounded={'none'}
                    border={'1px solid black'}
                    p={6}
                    overflow={{ base: 'auto', md: 'initial' }}
                  >
                    <Box position="relative" py="13px" mb={2}>
                      <Text
                        as={'h2'}
                        fontSize="lg"
                        fontWeight="bold"
                        lineHeight="24px"
                      >
                        burn to print
                      </Text>
                      <CloseButton
                        color="gray.500"
                        onClick={onClose}
                        position="absolute"
                        right={0}
                        top={0}
                        w="44px"
                        h="44px"
                        size="lg"
                        rounded={'none'}
                      />
                    </Box>
                    <Box>
                      <Text mb={0}>
                        Transform your digital NFT into a physical artwork.
                        Follow these simple steps.
                      </Text>
                      <Section title={'Step 1: Contact Assembly'}>
                        <ChakraLink
                          as={Link}
                          target="_blank"
                          href={
                            'https://docs.google.com/forms/d/e/1FAIpQLSem_BeTLxJAgkLcI7U3RWkJaZxptPVEWHii5xtbg7KtNue8Bw/viewform'
                          }
                        >
                          Fill in the contact form here
                        </ChakraLink>{' '}
                        for delivery details. Provide necessary shipping
                        information.
                      </Section>
                      <Section title={'Step 2: Payment and Confirmation Code'}>
                        Follow Assembly instructions for payment. And note down
                        the <b>code received</b>.
                      </Section>

                      <Section title={'Step 3: Burn Your NFT Token'}>
                        With your confirmation code, return here.
                        <br /> Click on{' '}
                        <i>
                          &apos;i have the code and want to proceed&apos;
                        </i>{' '}
                        button and enter your confirmation code.
                      </Section>
                      <Section title={'Step 4: Finalize and Print'}>
                        Contact Assembly to inform of the completed burn.
                        <br />
                        Once confirmed, Assembly will handle printing and
                        shipping.
                      </Section>
                      <Text mt={6} fontStyle={'italic'}>
                        Note: For detailed information, visit{' '}
                        <ChakraLink as={Link} href={'/about#faq'}>
                          our FAQs
                        </ChakraLink>
                        .
                      </Text>
                    </Box>

                    <ModalFooter gap={4} px={0} pt={8}>
                      <Button onClick={onClose} variant={'outline'}>
                        cancel
                      </Button>
                      <BurnModal id={id} />
                    </ModalFooter>
                  </ModalContent>
                </Modal>
              )}
            </Flex>
          </Flex>
        </Flex>
      )}
    </FullPageTemplate>
  )
}
