'use client'

import React, { useEffect } from 'react'
import { Container } from '@chakra-ui/react'
import Header from 'components/Header'
import Footer from 'components/Footer'

export default function FullPageTemplate({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    if (window.location.hash) {
      setTimeout(() => {
        const id = window.location.hash.replace('#', '')
        const element = document.getElementById(id)
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest',
          })
        }
      }, 1000)
    }
  }, [])
  return (
    <Container maxW={'8xl'} maxH={'100vh'}>
      <Header />
      {children}
      <Footer />
    </Container>
  )
}
