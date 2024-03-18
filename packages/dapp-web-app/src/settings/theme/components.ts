import { Heading, defineStyle, defineStyleConfig } from '@chakra-ui/react'

const components = {
  Heading: defineStyleConfig({
    baseStyle: {
      fontWeight: 'normal',
      pt: 12,
      pb: 4,
    },
  }),
  Input: defineStyleConfig({
    baseStyle: {
      borderRadius: 0,
      rounded: 'none',
      borderColor: 'gray.900',
    },
  }),
  Button: defineStyleConfig({
    sizes: {
      md: {
        // fontWeight: 'bold',
        height: 8,
        fontSize: 11,
        px: 4,
        py: 0,
      },
    },
    variants: {
      solid: defineStyle(({ colorScheme }) => ({
        bgColor: `${colorScheme}.900`,
        color: 'gray.50',
        borderWidth: 2,
        borderColor: `${colorScheme}.900`,
        _hover: {
          bgColor: `gray.50`,
          color: `${colorScheme}.900`,
          borderWidth: '2px',
          borderColor: `${colorScheme}.900`,
          borderStyle: 'solid',
          _disabled: {
            bgColor: `${colorScheme}.900`,
            color: 'gray.50',
            borderWidth: '2px',
            borderColor: `${colorScheme}.900`,
            borderStyle: 'solid',
          },
        },
        _active: {
          background: ``,
        },
      })),
      outline: defineStyle(({ colorScheme }) => ({
        borderWidth: 2,
        borderColor: `${colorScheme}.900`,
        rounded: 'none',
        // pt: 1,
        // pb: 0,
      })),
    },
    baseStyle: {
      borderRadius: 0,
      _disabled: {
        transition: 'none',
      },
      textTransform: 'uppercase',
    },
  }),
  Link: defineStyleConfig({
    baseStyle: {
      color: 'black',
      _hover: {
        color: 'cyan.400',
        textDecoration: 'underline',
      },
    },
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
