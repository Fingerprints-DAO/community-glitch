import { TableContainer, Tbody, Table, TableProps } from '@chakra-ui/react'

export const CustomTable = ({ children, ...props }: TableProps) => {
  return (
    <TableContainer overflowY={'auto'} {...props}>
      <Table variant="simple" size={'sm'} textColor={'gray.500'}>
        <Tbody>{children}</Tbody>
      </Table>
    </TableContainer>
  )
}
