'use client'

import FullPageTemplate from 'components/Templates/FullPage'
import { AuctionProvider } from 'contexts/AuctionContext'
import dynamic from 'next/dynamic'

const DynamicArtGrid = dynamic(() => import('components/ArtGrid'), {
  ssr: false,
})

export default function Home() {
  return (
    <FullPageTemplate>
      <AuctionProvider>
        <DynamicArtGrid />
      </AuctionProvider>
    </FullPageTemplate>
  )
}
