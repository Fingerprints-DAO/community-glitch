import { TableCellProps, Td, Text } from '@chakra-ui/react'
import { ReactNode } from 'react'

export const TableCell = ({
  children,
  ...props
}: TableCellProps & { children: ReactNode }) => (
  <Td py={2} px={0} {...props}>
    <Text as={'span'}>{children}</Text>
  </Td>
)
