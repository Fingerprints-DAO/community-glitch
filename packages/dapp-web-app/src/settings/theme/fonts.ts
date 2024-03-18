import { Theme } from '@chakra-ui/react'
import { Courier_Prime } from 'next/font/google'

const courier = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
})

const fonts: Partial<Theme['fonts']> = {
  body: courier.style.fontFamily,
  heading: courier.style.fontFamily,
}

export default fonts
