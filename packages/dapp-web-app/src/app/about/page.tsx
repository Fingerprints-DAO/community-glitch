'use client'

import { ReactNode } from 'react'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  HeadingProps,
  Text,
  TextProps,
} from '@chakra-ui/react'
import FullPageTemplate from 'components/Templates/FullPage'
import { questions, allowListQuestions, printsQuestions } from './_questions'
import { EtherSymbol } from 'components/EtherSymbol'

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

const SubSection = ({
  title = '',
  children,
  titleProps = {},
}: {
  title: string
  children: ReactNode
  titleProps?: HeadingProps
}) => (
  <Box as={'article'}>
    <SectionSubtitle mb={2} {...titleProps}>
      {title}
    </SectionSubtitle>
    <Text as={'div'}>{children}</Text>
  </Box>
)

const LineSpace = () => (
  <>
    <br />
    <br />
  </>
)

export default function About() {
  return (
    <FullPageTemplate>
      <Section title="about glitch" titleProps={{ pt: 0 }}>
        glitch by misha de ridder, released by Fingerprints, is a collection of
        50 animated GIFs, stemming from photographs of erased graffiti. The act
        of erasing can involve both destruction and generation, transformation
        and reimagination—allowing for new possibilities to emerge.
        <LineSpace />
        Playing with notions of loss and re-coding, misha has re-animated the
        graffiti, inserting liminal afterimages of what was once there: faces,
        text, and indecipherable symbols. The result is a series of images that
        blur the lines between abstract painting, photography, animation, and
        token art. glitch meditates on the idea of “unwanted information,”—the
        delineation between messages that are wanted, seen, and proliferated,
        and those that are not. Like memes for the public space, graffiti is a
        subversive, spontaneous form of communication meant for the masses.
        <LineSpace />
        As a commentary on secondary market dynamics, misha has also introduced
        a twist: each time a token is traded, the artwork changes. On the first
        trade, the animation vanishes. Subsequent trades cause the image to
        fade, until eventually, the token points to a blank placeholder.
        <LineSpace />
        Collectors can pay to restore the image to the minted original, or
        choose to burn the token to redeem it for a limited edition, physical
        fine art print through a collaboration with Assembly.
      </Section>
      <Section title="misha de ridder">
        misha de ridder is a visual artist making conceptual photo and video
        work concerned with perception. His quiet images evoke contemplation and
        intimacy and invite viewers to look anew at what we consider known and
        to rethink our surroundings. Reality as an act of deep imagination.
        <LineSpace />
        de ridder&#39;s work has been exhibited internationally at institutions
        such as Foam Photography Museum, Museum of the City of New York,
        Stedelijk Museum Amsterdam and many others. His work has been acquired
        by both private and major public collections. de ridder has also
        published seven monographs a.o. Abendsonne (Schaden 2011), Falaise (Roma
        2016), and high up close by (Roma 2019).
        <LineSpace />
        misha de ridder entered crypto space in 2020. He started out with NFT on
        Foundation and &#x27;hic et nunc&#x27;. Among his celebrated drops are
        &#x27;high up close by&#x27; 2021 on Foundation in collaboration with
        Assembly Curated and &#x27;generative by nature&#x27; in 2022 on a
        self-build marketplace on Tezos. In 2023 he released a fun and ironic
        edition &#x27;grass&#x27; on Optimism.
        <LineSpace />
        de ridder is an active member of several DAOs and web3 communities like
        JPG, Kiwi News, Obscura, Purple and Trust, curating art and writing
        about philosophy, art, technology and blockchain.
      </Section>
      <Section title="drop mechanics">
        <SubSection title="1/1 auction">
          Ranked auction with rebate
          <LineSpace />
          Thursday, April 25 at 1 PM EDT / 7pm CEST
          <br />
          0.06
          <EtherSymbol /> starting bid
          <br />3 days
        </SubSection>
        <LineSpace />
        <SubSection title="edition mint">
          Sunday, April 28 at 1 PM EDT / 7pm CEST
          <br />
          0.03
          <EtherSymbol /> fixed price
          <br />7 days
          <LineSpace />
          As soon as the auction closes, a limited mint of 510 editions will
          become available, representing various mosaics of the full collection
          in randomized order. These images will slowly degrade as more editions
          are minted, until the last 10 editions in the series are left
          completely blank. The edition mint will close on Sunday, May 5 at 1PM
          EDT / 7pm CEST.
          <LineSpace />
          Members of partner communities and collectors of select works by misha
          de ridder will be granted a 15% discount at mint for both the 1/1
          auction and the edition mint.
        </SubSection>
        <LineSpace />
        <SubSection title="physical print claim">
          Assembly will offer large scale museum quality fine art prints for
          collectors who choose to burn their 1/1 token to purchase a physical
          print.
          <LineSpace />
          All prints are produced on Canson Rag Photographique 310gsm paper with
          Canon Lucia Pro ink, and come in 40 x 50 / 40 x 60 in. sizes, based on
          the image aspect ratio.
          <LineSpace />
          Print redemption costs $3,000, which can be paid in USDC or other
          crypto.
          <LineSpace />
          To burn and redeem your token for a print go to the page of the token
          you want to burn. A burn-to-print button will be displayed when you
          are the owner. When clicked, it will display a modal informing you of
          the step-by-step process to make it happen.
        </SubSection>
      </Section>
      <Section title="dynamic token mechanics">
        All 50 1 of 1s in the series are designed to degrade with each secondary
        market trade or transfer to another wallet. The token’s traits, title
        and token ID always remain except when you burn the token for a print.
        Anyone can pay a small amount to refresh the token, restoring it to its
        original state on the website glitch.mishaderidder.xyz.
        <LineSpace />
        1. The initial collector receives an original photo with liminal
        animation as GIF-file.
        <br />
        2. After the first sale or transfer, the animation disappears, leaving
        only the photo.
        <br /> 3. After the second sale or transfer the photo fades 50%.
        <br /> 4. After the third sale or transfer the photo will disappear
        leaving only a placeholder.
      </Section>
      <Section title="contact fingerprints dao, & artist">
        fingerprints [email]
        <LineSpace />
        assembly [info@assembly.art]
        <LineSpace />
        misha de ridder [misha@mishaderidder.xyz]
      </Section>

      <Section title="Frequently asked questions">
        <Accordion id={'faq'}>
          <SectionSubtitle my={4} textDecor={'underline'}>
            One of ones
          </SectionSubtitle>
          {questions.map((item, index) => (
            <AccordionItem as={'article'} key={index}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton py={6}>
                      <Box as="span" flex="1" textAlign="left">
                        <Text
                          as="h2"
                          fontSize="lg"
                          display="block"
                          fontWeight={'bold'}
                        >
                          {item.question}
                        </Text>
                      </Box>
                      <Text fontSize={'2xl'}>{isExpanded ? '-' : '+'}</Text>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel py={6}>{item.answer}</AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
        <Accordion id={'allowlist'} mt={8}>
          <SectionSubtitle my={4} textDecor={'underline'}>
            Allowlist
          </SectionSubtitle>
          {allowListQuestions.map((item, index) => (
            <AccordionItem as={'article'} key={index}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton py={6}>
                      <Box as="span" flex="1" textAlign="left">
                        <Text
                          as="h2"
                          fontSize="lg"
                          display="block"
                          fontWeight={'bold'}
                        >
                          {item.question}
                        </Text>
                      </Box>
                      <Text fontSize={'2xl'}>{isExpanded ? '-' : '+'}</Text>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel py={6}>{item.answer}</AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
        <Accordion id={'prints'} mt={8}>
          <SectionSubtitle my={4} textDecor={'underline'}>
            Prints
          </SectionSubtitle>
          {printsQuestions.map((item, index) => (
            <AccordionItem as={'article'} key={index}>
              {({ isExpanded }) => (
                <>
                  <h2>
                    <AccordionButton py={6}>
                      <Box as="span" flex="1" textAlign="left">
                        <Text
                          as="h2"
                          fontSize="lg"
                          display="block"
                          fontWeight={'bold'}
                        >
                          {item.question}
                        </Text>
                      </Box>
                      <Text fontSize={'2xl'}>{isExpanded ? '-' : '+'}</Text>
                    </AccordionButton>
                  </h2>
                  <AccordionPanel py={6}>{item.answer}</AccordionPanel>
                </>
              )}
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </FullPageTemplate>
  )
}
