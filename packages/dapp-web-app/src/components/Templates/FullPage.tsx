'use client'

import React from 'react'
import { Container } from '@chakra-ui/react'
import Header from 'components/Header'
import Footer from 'components/Footer'

export default function FullPageTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Container maxW={'8xl'} maxH={'100vh'}>
      <Header />
      {children}
      <Footer />
    </Container>
  )
}
