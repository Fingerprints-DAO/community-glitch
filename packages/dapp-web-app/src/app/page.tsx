'use client'

import Image from 'next/image'
// import { ConnectKitButton } from 'components/ConnectKitButton'
import { Connected } from 'components/Connected'
import { Account } from 'components/Account'
import { Balance } from 'components/Balance'
import { Box } from '@chakra-ui/react'
import FullPageTemplate from 'components/Templates/FullPage'

export default function Home() {
  return (
    <FullPageTemplate>
      <Box as={'main'}></Box>
    </FullPageTemplate>
  )
}
