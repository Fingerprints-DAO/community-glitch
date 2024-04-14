'use client'

import FullPageTemplate from 'components/Templates/FullPage'
import ArtGrid from 'components/ArtGrid'
import { AuctionProvider } from 'contexts/AuctionContext'

export default function Home() {
  return (
    <FullPageTemplate>
      <AuctionProvider>
        <ArtGrid />
      </AuctionProvider>
    </FullPageTemplate>
  )
}
