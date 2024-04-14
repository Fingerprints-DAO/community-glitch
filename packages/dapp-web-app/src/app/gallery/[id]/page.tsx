'use client'

import FullPageTemplate from 'components/Templates/FullPage'
import Token from './components/Token'
import { AuctionProvider } from 'contexts/AuctionContext'

export default function Page({ params: { id } }: { params: { id: string } }) {
  return (
    <FullPageTemplate>
      <AuctionProvider>
        <Token id={Number(id)} />
      </AuctionProvider>
    </FullPageTemplate>
  )
}
