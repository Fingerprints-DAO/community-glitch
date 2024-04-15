'use client'

import { ReactNode } from 'react'
import {
  Box,
  Heading,
  HeadingProps,
  Text,
  TextProps,
  Link as ChakraLink,
} from '@chakra-ui/react'
import Link from 'next/link'
import FullPageTemplate from 'components/Templates/FullPage'
import ChakraNextImageLoader from 'components/ChakraNextImageLoader'

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
    <Heading as={'h1'} {...titleProps}>
      {title}
    </Heading>
    <Text as={'div'}>{children}</Text>
  </Box>
)

const SectionSubtitle = ({
  children,
  ...props
}: TextProps & { children: ReactNode }) => (
  <Text as={'h2'} fontSize={'lg'} fontWeight={'bold'} {...props}>
    {children}
  </Text>
)

const LineSpace = () => (
  <>
    <br />
    <br />
  </>
)

export default function PrintClaimPage() {
  return (
    <FullPageTemplate>
      <Box maxW={'xl'} mx={'auto'} pb={8}>
        <ChakraNextImageLoader
          src={'/print-claim-image.gif'}
          alt={'Print preview'}
          imageWidth={1024}
          imageHeight={1024}
          imageProps={{
            priority: true,
            unoptimized: true,
          }}
        />
      </Box>
      <Section
        title="physical print claim for glitch — misha de ridder"
        titleProps={{ pt: 0 }}
      >
        If you are a 1/1 token holder, you can take advantage of the special
        opportunity to acquire a large-scale fine art print by the artist,
        fulfilled by Assembly.
        <LineSpace />
        Assembly will offer gallery-quality fine art prints for collectors who
        choose to burn their 1/1 token to purchase a physical print.
        <LineSpace />
        All prints are produced on Canson Rag Photographique 310gsm paper with
        Canon Lucia Pro ink, and come in 40 x 50 / 40 x 60 in. sizes, based on
        the image aspect ratio. Print redemption costs $3,000, which can be paid
        in USDC or other crypto. Prints include a signed label and certificate
        of authenticity from the artist.
        <LineSpace />
        On the token page, a burn-to-print button will be displayed when the
        user is the owner. When clicked, it will display a modal informing you
        of the step-by-step process to make it happen. Fill out the form to
        provide contact and shipping information. Please include all information
        requested to assure a smooth process.
        <LineSpace />
        After receiving your information, Assembly will send you a payment
        request. After payment you will receive a code for Assembly. Go back to
        the token page and use the burn-to-print button to start the token
        burning process filling in the code. After you burn your token Assembly
        will produce and ship your unique print.
        <LineSpace />
        Official email communication about prints will only come from an
        official{' '}
        <ChakraLink as={Link} target="_blank" href={'https://assembly.art/'}>
          assembly.art
        </ChakraLink>{' '}
        domain.
      </Section>
    </FullPageTemplate>
  )
}
