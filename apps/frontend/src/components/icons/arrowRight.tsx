import styled from 'styled-components'
import { ThemeContext } from '../../config/types'

/* eslint-disable max-len */
const ArrowRightIcon = ({
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
        d="M7.10211 3.33645L7.69669 2.82809C7.94844 2.61284 8.35554 2.61284 8.60462 2.82809L13.8112 7.27737C14.0629 7.49262 14.0629 7.84069 13.8112 8.05365L8.60462 12.5052C8.35286 12.7205 7.94577 12.7205 7.69669 12.5052L7.10211 11.9969C6.84767 11.7793 6.85303 11.4244 7.11282 11.2114L10.3401 8.58262H2.64279C2.28658 8.58262 2 8.3376 2 8.03304V7.30027C2 6.99572 2.28658 6.7507 2.64279 6.7507H10.3401L7.11282 4.12189C6.85035 3.90893 6.845 3.55399 7.10211 3.33645Z"
        context={context}
      />
    </svg>
  )
}
const StyledPath = styled.path<{ context: ThemeContext }>`
  fill: ${({ context, theme }) => theme.COLOUR[context]};
`
export default ArrowRightIcon
