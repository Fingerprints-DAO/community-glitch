/* eslint-disable react/jsx-key */
import { Button } from 'frames.js/next'
import { frames } from './frames'

const handleRequest = frames(async (ctx) => {
  if (ctx.message?.transactionId) {
    return {
      image: (
        <div tw="bg-white text-black w-full h-full justify-center items-center flex">
          Transaction submitted! {ctx.message.transactionId}
        </div>
      ),
      imageOptions: {
        aspectRatio: '1:1',
      },
      buttons: [
        <Button
          action="link"
          target={`https://etherscan.io/tx/${ctx.message.transactionId}`}
        >
          View on block explorer
        </Button>,
      ],
    }
  }

  return {
    image: 'https://glitch.mishaderidder.com/mint-edition/thumbnails/1.png',
    imageOptions: {
      aspectRatio: '1:1',
    },
    buttons: [
      <Button action="tx" target="/txdata" post_url="/">
        Mint 1 per 0.025Ξ
      </Button>,
      <Button
        action="link"
        target="https://glitch.mishaderidder.com/mint-edition"
      >
        Mint multiple on the website
      </Button>,
    ],
  }
})

export const GET = handleRequest
export const POST = handleRequest
