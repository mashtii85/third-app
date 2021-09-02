/**
 * Dashboard - Tile - Body
 */

// Style
import styled from 'styled-components'
// UI
import { Heading } from '@drykiss/industry-ui'

interface TileBodyProps {
  body: string
  className?: string
  description: string
  size: string
  title: string
}

const TileBody = ({ body, className, description, size, title }: TileBodyProps) => {
  return (
    <StyledBody className={className}>
      {title && (
        <StyledWrapper>
          <StyledTitle content={title} size={size} tag="h2" />
        </StyledWrapper>
      )}

      <StyledContent size={size}>{body}</StyledContent>
      {description && <StyledDescription size={size}>{description}</StyledDescription>}
    </StyledBody>
  )
}

const StyledWrapper = styled.div`
  display: flex;
`
const StyledBody = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`

const StyledTitle = styled(Heading)`
  color: #fff;
  font-size: ${({ size, theme }) => theme.TILE.FONT_SIZE_TITLE[size]};
  font-weight: 600;
`

const StyledContent = styled.div<{ size: string }>`
  align-items: center;
  align-self: center;
  display: flex;
  flex-grow: 1;
  font-weight: 700;
  font-size: ${({ size, theme }) => {
    return theme.TILE.FONT_SIZE_BODY[size]
  }};
`
const StyledDescription = styled.div<{ size: string }>`
  display: flex;
  font-size: ${({ size }) => {
    return size
  }};
`

export default TileBody
