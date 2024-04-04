import { InfoOutlineIcon } from '@chakra-ui/icons'
import { Tooltip, TooltipProps } from '@chakra-ui/react'

export const InfoTooltip = ({ ...props }: Omit<TooltipProps, 'children'>) => {
  if (!props.label) return null
  return (
    <Tooltip hasArrow bg="gray.300" color="black" {...props}>
      <InfoOutlineIcon w={3} />
    </Tooltip>
  )
}
