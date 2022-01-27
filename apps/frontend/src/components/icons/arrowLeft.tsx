import styled from 'styled-components'
import { ThemeContext } from '@availabletowork/types'

/* eslint-disable max-len */
const LeftArrowIcon = ({
  context = 'white',
  size = 16
}: {
  context?: ThemeContext
  size?: number
}) => {
  return (
    <svg
      width={`${size}`}
      height={`${size}`}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <StyledPath
        d="M8.79815 12.0415L8.26963 12.516C8.04585 12.7169 7.68398 12.7169 7.46258 12.516L2.83453 8.36334C2.61074 8.16244 2.61074 7.83758 2.83453 7.63882L7.46258 3.48402C7.68636 3.28312 8.04823 3.28312 8.26963 3.48402L8.79815 3.95849C9.02431 4.16152 9.01955 4.4928 8.78862 4.69156L5.9199 7.14511H12.762C13.0786 7.14511 13.3334 7.3738 13.3334 7.65805V8.34197C13.3334 8.62622 13.0786 8.85491 12.762 8.85491H5.9199L8.78862 11.3085C9.02193 11.5072 9.02669 11.8385 8.79815 12.0415Z"
        context={context}
        fill-opacity="0.8"
      />
    </svg>
  )
}
const StyledPath = styled.path<{ context: ThemeContext }>`
  fill: ${({ context, theme }) => theme.COLOUR[context]};
`
export default LeftArrowIcon
