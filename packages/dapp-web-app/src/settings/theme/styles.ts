import { Theme } from '@chakra-ui/react'

const styles: Theme['styles'] = {
  global: ({ theme }) => ({
    body: {
      background: '#FEF9FF',
      color: theme.colors.black,
    },
    h1: {
      color: theme.colors.gray[700],
    },
    h2: {
      color: theme.colors.gray[700],
    },
    h3: {
      color: theme.colors.gray[700],
    },
    h4: {
      color: theme.colors.gray[700],
    },
    h5: {
      color: theme.colors.gray[700],
    },
    h6: {
      color: theme.colors.gray[700],
    },
  }),
}

export default styles
