import { EtherSymbol } from 'components/EtherSymbol'

const LineSpace = () => (
  <>
    <br />
    <br />
  </>
)

export const questions = [
  {
    question: 'What are the degradation dynamics?',
    answer: (
      <>
        &rsquo;glitch&lsquo; is dynamic conceptual blockchain art and an
        experiment in how to introduce degradation in a digital artwork. In this
        respect it is also a commentary on secondary market dynamics. It is
        intended to be fun and playful. The degradation is part of the artwork
        and a degraded artwork is still an artwork.
        <LineSpace />
        1. The initial collector receives an original photo with subliminal
        animation as GIF-file.
        <br />
        2. After the first sale or transfer, the animation disappears, leaving
        only the photo.
        <br />
        3. After the second sale or transfer the photo fades 50%.
        <br />
        4. After the third sale or transfer the photo will disappear leaving
        only a placeholder.
        <br />
        <LineSpace />
        You can refresh your art to the mint original clicking the refresh
        button on the specific token page of your piece. The refresh will
        perform a blockchain transaction involving paying a small fee.
      </>
    ),
  },
  {
    question:
      'How can I refresh my art to the mint original if has been degraded?',
    answer: (
      <>
        You can refresh your art to the mint original clicking the refresh
        button on the specific token page of your piece. The refresh will
        perform a blockchain transaction involving paying a small fee of 0.004
        <EtherSymbol />
        <LineSpace />
        The fee is intended as a substitute for creator royalties. When trading
        on a marketplace the glitch tokens are 0% creator fee, so royalties
        free. By refreshing your art you are supporting the project and the
        artist.
      </>
    ),
  },
  {
    question: 'Are you using smart contracts to run the dynamic mechanics?',
    answer: (
      <>
        The 50 1/1s edition dynamic mechanics run on smart contracts on the
        Ethereum blockchain and each transfer degrades the art automatically.
        Also the artwork refresh and burn runs on a smart contract and is all
        onchain.
      </>
    ),
  },
  {
    question: 'How is the art stored?',
    answer: (
      <>
        Initially a server is used to quickly provide the art, and then we will
        move the art to IPFS as soon as things settle down after the claim.
        <LineSpace />
        misha de ridder is running a dedicated IPFS node for all his art and the
        art he collected in his studio. You can run your own IPFS node too and
        help to take care of the &rsquo;glitch&lsquo; art and the art of others.
        It&apos;s easy!
      </>
    ),
  },
  {
    question: 'What is the copyright licence for the 1/1s?',
    answer: <>The glitch animations are Creative Commons Zero (CC0) license.</>,
  },
  {
    question:
      'How will the Ranked auction with rebate work for the 1/1s? Can I choose which piece from the auction I want to bid on?',
    answer: (
      <>
        You cannot select a specific piece to bid on.
        <LineSpace />
        This is a ranked auction, meaning all collectors are bidding on all
        pieces. When the auction ends, each collector will be assigned a token
        id according to their position on bid ranking (The highest bidder gets
        #1 and the lowest one in the 50 bids get #50)
        <LineSpace />
        You can bid as many times as you’d like. Each bid will be positioned in
        the ranking.
      </>
    ),
  },
  {
    question: 'How do I exchange my 1/1 glitch work for a print?',
    answer: (
      <>
        Assembly will offer large scale museum quality fine art prints for
        collectors who choose to burn their 1/1 token to purchase a physical
        print.
        <LineSpace />
        All prints are produced on Canson Rag Photographique 310gsm paper with
        Canon Lucia Pro ink, and come in 40 x 50 / 40 x 60 in. sizes, based on
        the image aspect ratio. Print redemption costs $3,000, which can be paid
        in USDC or other crypto.
        <LineSpace />
        To burn and redeem your token for a print go to the page of the token
        you want to burn. A burn-to-print button will be displayed when you are
        the owner. When clicked, it will display a modal informing you of the
        step-by-step process to make it happen.
      </>
    ),
  },
  {
    question:
      'Can I burn to exchange a 1/1 glitch work for a print even if it is blank?',
    answer: <>Yes.</>,
  },
]
export const allowListQuestions = [
  {
    question: 'How will the allowlist work?',
    answer:
      'Members of partner communities and collectors of select works by misha de ridder will be granted a 15% discount at mint for both the 1/1 auction and the edition mint.',
  },
  {
    question: 'How do discounts work?',
    answer: (
      <>
        Certain communities and holders of NFT could be eligible for a discount
        if they correctly filled out the allowlist form provided to them.
        Discounts work only by minting on the website - not directly on
        Etherscan.
        <LineSpace />
        For the 1/1 auction pieces, discounts will be applied when the user
        claims the nfts and refunds. They must bid and commit ETH to bid, then
        we calculate the refund based on lowest bid + discount.
      </>
    ),
  },
  {
    question:
      'If I am on the allowlist, do I have a discount on both the 1/1 auction and the editioned mints for glitch?',
    answer: (
      <>
        Yes. Allowlist discounts are valid for both parts of the minting process
        for glitch.
      </>
    ),
  },
  {
    question: 'When do allowlist sign ups close?',
    answer:
      'We will take a snapshot 24 hours before the 1/1 auction begins for collectors who want to bid in the 1/1 ranked auction with rebate. ',
  },
]

export const printsQuestions = [
  {
    question: 'What is the copyright licence for the prints?',
    answer: (
      <>
        Prints are Creative Commons Attribution-NonCommercial (CC BY NC) license
      </>
    ),
  },
  {
    question:
      'I collected a 1 of 1. How do I acquire a physical print from Assembly?',
    answer: (
      <>
        Assembly will offer large scale museum quality fine art prints for
        collectors who choose to burn their 1/1 token to purchase a physical
        print. To burn a 1/1 token and acquire a physical print go to the page
        of the specific token you&#39;d like to burn. You can only acquire a
        print for the specific art work you own.
        <LineSpace />
        All prints are produced on Canson Rag Photographique 310gsm paper with
        Canon Lucia Pro ink, and come in 40 x 50 / 40 x 60 in. sizes, based on
        the image aspect ratio. Print redemption costs $3,000, which can be paid
        in USDC or crypto. Prints include a signed label and certificate of
        authenticity from the artist.
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
      </>
    ),
  },
]

export const mintEditionQuestions = [
  {
    question: 'What are the mechanics for the fading of the 510 editions?',
    answer: (
      <>
        1 - 10 are full
        <LineSpace />
        11 - 110 / lose 1 animation in steps of 10 - so minus 10 animations{' '}
        <br />
        111 - 210 / lose 4 animations in steps of 10 - so minus 40 animations
        <br />
        now animations are all gone
        <LineSpace />
        211 - 310 / 1 image fades 50% in steps of 10 - so 10 fade 50%
        <br />
        311 - 410 / 4 images fade in steps of 10 - so 40 fade 50%
        <br />
        now all are faded 50%
        <LineSpace />
        411 - 510 / 6 images become blank in steps of 10 - last 10 will be fully
        blank
      </>
    ),
  },
  {
    question: 'Can I restore one of the 510 editions to a full image?',
    answer: (
      <>
        No. Paying to refresh will only be valid for the 1/1 pieces in{' '}
        <i>glitch</i>
      </>
    ),
  },
  {
    question: 'How is the art stored?',
    answer: (
      <>
        Initially a server is used to quickly provide the art, and then we will
        move the art to IPFS as soon as things settle down after the mints. The
        Mint edition NFT are all fixed HTML and different according to each ID.
        <LineSpace />
        misha de ridder is running a dedicated IPFS node for all his art and the
        art he collected in his studio. You can run your own IPFS node too and
        help to take care of the &rsquo;glitch&lsquo; art and the art of others.
        It&apos;s easy!
      </>
    ),
  },
]

export default questions
