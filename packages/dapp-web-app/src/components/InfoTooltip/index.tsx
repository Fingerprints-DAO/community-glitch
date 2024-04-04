import { InfoOutlineIcon } from '@chakra-ui/icons'
import { IconProps, Tooltip, TooltipProps } from '@chakra-ui/react'

type InfoTooltipType = TooltipProps & {
  iconProps?: IconProps
}

export const InfoTooltip = ({
  iconProps,
  ...props
}: Omit<InfoTooltipType, 'children'>) => {
  if (!props.label) return null
  return (
    <Tooltip hasArrow bg="gray.300" color="black" {...props}>
      <InfoOutlineIcon w={3} {...iconProps} />
    </Tooltip>
  )
}
