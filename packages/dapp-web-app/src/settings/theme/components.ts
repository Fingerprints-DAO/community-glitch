import { Heading, defineStyle, defineStyleConfig } from '@chakra-ui/react'
import { inputTheme } from './input'

const blackButton = {
  bgColor: 'black',
  color: 'white',
  borderColor: 'black',
}
const outlineButton = {
  bgColor: 'white',
  color: 'black',
  borderColor: 'black',
}

const components = {
  Heading: defineStyleConfig({
    baseStyle: {
      fontWeight: 'normal',
      pt: 12,
      pb: 4,
    },
  }),
  Input: inputTheme,
  Button: defineStyleConfig({
    variants: {
      solid: defineStyle(({ colorScheme }) => ({
        ...blackButton,
        _hover: {
          ...blackButton,
          borderStyle: 'solid',
          // _disabled: {
          //   bgColor: `${colorScheme}.900`,
          //   color: 'gray.50',
          //   borderColor: `${colorScheme}.900`,
          //   borderStyle: 'solid',
          // },
          _disabled: {
            ...blackButton,
          },
        },
        _active: {
          ...outlineButton,
        },
      })),
      outline: defineStyle(({ colorScheme }) => ({
        ...outlineButton,
        _hover: {
          ...outlineButton,
          borderStyle: 'solid',
        },
        _active: {
          ...blackButton,
        },
      })),
    },
    baseStyle: {
      borderRadius: 0,
      textTransform: 'lowercase',
      borderWidth: 1,
    },
  }),
  Link: defineStyleConfig({
    baseStyle: {
      // color: 'black',
      // _hover: {
      //   color: 'cyan.400',
      // },
      color: 'gray.500',
      textDecoration: 'underline',
    },
    defaultProps: {},
  }),
  Checkbox: defineStyleConfig({
    baseStyle: {
      control: {
        rounde: 'none',
        borderRadius: 0,
      },
    },
  }),
}

export default components
