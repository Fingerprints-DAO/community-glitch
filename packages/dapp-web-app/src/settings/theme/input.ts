import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys)

const baseStyle = definePartsStyle({
  // define the part you're going to style
  defaultProps: {},
  group: {
    border: '1px solid black',
    px: 4,
  },
  field: {
    borderRadius: 0,
    rounded: 'none',
    border: '0`',
    py: 2,
    textAlign: 'right',
    fontSize: 'lg',
    _placeholder: {
      textColor: 'gray.400',
    },
  },
  addon: {
    bgColor: 'white',
    border: '0',
    rounded: 'none',
    pr: 3,
    textColor: 'gray.600',
    fontSize: 'lg',
  },
})

export const inputTheme = defineMultiStyleConfig({ baseStyle })
