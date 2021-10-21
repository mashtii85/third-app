/**
 * Components - Common - Icons
 */

import { CustomSVG } from './styles'

export const CustomIcon = ({
  path,
  color = '#999',
  size = 80
}: {
  path: string
  color?: string
  size?: number
}) => {
  return (
    <CustomSVG size={size} viewBox="0 0 24 24">
      <path d={path} fill={color} />
    </CustomSVG>
  )
}
