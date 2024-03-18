'use client'

import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  HeadingProps,
  Text,
} from '@chakra-ui/react'
import FullPageTemplate from 'components/Templates/FullPage'
import { ReactNode } from 'react'
import questions from './_questions'

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

export default function About() {
  return (
    <FullPageTemplate>
      <Section title="about glitch" titleProps={{ pt: 0 }}>
        Long text about Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque consequat egestas risus ac consequat. Mauris pulvinar neque
        et tellus suscipit dictum. Suspendisse nec dui aliquet, dignissim ligula
        nec, blandit enim. Pellentesque nec nunc dapibus, vehicula felis et,
        tempor lacus. Morbi ultrices eget magna at n urpis, nec tristique risus.
        In pulvina Curabitur at ligula eu metus tincidunt ultricies. Maecenas
        nulla quam, eleifend vitae lectus ac, placerat feugiat justo. Curabitur
        semper, neque interdum auctor elementum, sapien urna blandit lacus, id
        scelerisque mauris nunc ut libero. Sed accumsan nisi condimentum aliquet
        volutpat. Mauris tempor euismod imperdiet. Pellentesque sit amet ligula
        vitae augue elementum lobortis nec id orci. Quisque finibus felis arcu,
        eu imperdiet augue tincidunt quis.
      </Section>
      <Section title="misha de ridder">
        Long text about Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque consequat egestas risus ac consequat. Mauris pulvinar neque
        et tellus suscipit dictum. Suspendisse nec dui aliquet, dignissim ligula
        nec, blandit enim. Pellentesque nec nunc dapibus, vehicula felis et,
        tempor lacus. Morbi ultrices eget magna at n urpis, nec tristique risus.
        In pulvina Curabitur at ligula eu metus tincidunt ultricies. Maecenas
        nulla quam, eleifend vitae lectus ac, placerat feugiat justo. Curabitur
        semper, neque interdum auctor elementum, sapien urna blandit lacus, id
        scelerisque mauris nunc ut libero. Sed accumsan nisi condimentum aliquet
        volutpat. Mauris tempor euismod imperdiet. Pellentesque sit amet ligula
        vitae augue elementum lobortis nec id orci. Quisque finibus felis arcu,
        eu imperdiet augue tincidunt quis.
      </Section>
      <Section title="concept">
        Long text about Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque consequat egestas risus ac consequat. Mauris pulvinar neque
        et tellus suscipit dictum. Suspendisse nec dui aliquet, dignissim ligula
        nec, blandit enim. Pellentesque nec nunc dapibus, vehicula felis et,
        tempor lacus. Morbi ultrices eget magna at n urpis, nec tristique risus.
        In pulvina Curabitur at ligula eu metus tincidunt ultricies. Maecenas
        nulla quam, eleifend vitae lectus ac, placerat feugiat justo. Curabitur
        semper, neque interdum auctor elementum, sapien urna blandit lacus, id
        scelerisque mauris nunc ut libero. Sed accumsan nisi condimentum aliquet
        volutpat. Mauris tempor euismod imperdiet. Pellentesque sit amet ligula
        vitae augue elementum lobortis nec id orci. Quisque finibus felis arcu,
        eu imperdiet augue tincidunt quis.
      </Section>
      <Section title="about glitch">
        Long text about Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque consequat egestas risus ac consequat. Mauris pulvinar neque
        et tellus suscipit dictum. Suspendisse nec dui aliquet, dignissim ligula
        nec, blandit enim. Pellentesque nec nunc dapibus, vehicula felis et,
        tempor lacus. Morbi ultrices eget magna at n urpis, nec tristique risus.
        In pulvina Curabitur at ligula eu metus tincidunt ultricies. Maecenas
        nulla quam, eleifend vitae lectus ac, placerat feugiat justo. Curabitur
        semper, neque interdum auctor elementum, sapien urna blandit lacus, id
        scelerisque mauris nunc ut libero. Sed accumsan nisi condimentum aliquet
        volutpat. Mauris tempor euismod imperdiet. Pellentesque sit amet ligula
        vitae augue elementum lobortis nec id orci. Quisque finibus felis arcu,
        eu imperdiet augue tincidunt quis.
      </Section>
      <Section title="drop mechanics">
        Long text about Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque consequat egestas risus ac consequat. Mauris pulvinar neque
        et tellus suscipit dictum. Suspendisse nec dui aliquet, dignissim ligula
        nec, blandit enim. Pellentesque nec nunc dapibus, vehicula felis et,
        tempor lacus. Morbi ultrices eget magna at n urpis, nec tristique risus.
        In pulvina Curabitur at ligula eu metus tincidunt ultricies. Maecenas
        nulla quam, eleifend vitae lectus ac, placerat feugiat justo. Curabitur
        semper, neque interdum auctor elementum, sapien urna blandit lacus, id
        scelerisque mauris nunc ut libero. Sed accumsan nisi condimentum aliquet
        volutpat. Mauris tempor euismod imperdiet. Pellentesque sit amet ligula
        vitae augue elementum lobortis nec id orci. Quisque finibus felis arcu,
        eu imperdiet augue tincidunt quis.
      </Section>
      <Section title="dynamic token mechanics">
        Long text about Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque consequat egestas risus ac consequat. Mauris pulvinar neque
        et tellus suscipit dictum. Suspendisse nec dui aliquet, dignissim ligula
        nec, blandit enim. Pellentesque nec nunc dapibus, vehicula felis et,
        tempor lacus. Morbi ultrices eget magna at n urpis, nec tristique risus.
        In pulvina Curabitur at ligula eu metus tincidunt ultricies. Maecenas
        nulla quam, eleifend vitae lectus ac, placerat feugiat justo. Curabitur
        semper, neque interdum auctor elementum, sapien urna blandit lacus, id
        scelerisque mauris nunc ut libero. Sed accumsan nisi condimentum aliquet
        volutpat. Mauris tempor euismod imperdiet. Pellentesque sit amet ligula
        vitae augue elementum lobortis nec id orci. Quisque finibus felis arcu,
        eu imperdiet augue tincidunt quis.
      </Section>
      <Section title="contact fingerprints dao & artist">
        Long text about Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Pellentesque consequat egestas risus ac consequat. Mauris pulvinar neque
        et tellus suscipit dictum. Suspendisse nec dui aliquet, dignissim ligula
        nec, blandit enim. Pellentesque nec nunc dapibus, vehicula felis et,
        tempor lacus. Morbi ultrices eget magna at n urpis, nec tristique risus.
        In pulvina Curabitur at ligula eu metus tincidunt ultricies. Maecenas
        nulla quam, eleifend vitae lectus ac, placerat feugiat justo. Curabitur
        semper, neque interdum auctor elementum, sapien urna blandit lacus, id
        scelerisque mauris nunc ut libero. Sed accumsan nisi condimentum aliquet
        volutpat. Mauris tempor euismod imperdiet. Pellentesque sit amet ligula
        vitae augue elementum lobortis nec id orci. Quisque finibus felis arcu,
        eu imperdiet augue tincidunt quis.
      </Section>

      <Section title="Frequently asked questions">
        <Accordion id={'faq'}>
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
      </Section>
    </FullPageTemplate>
  )
}
