/**
 * Tile
 */

// Style
import styled from 'styled-components'

// UI
import { Link } from '@drykiss/industry-ui'
import TileBody from './body'
import { ColourConfig } from '../tiles/types'

interface TileProps {
  body: string
  className: string
  colourConfig: ColourConfig
  context: string
  description: string
  rounded: boolean
  shadow: string
  size: string
  title: string
  to: string
}

const Tile = ({
  body,
  className,
  colourConfig,
  title,
  to,
  shadow,
  context = 'success',
  description,
  rounded = false,
  size = 'sm'
}: TileProps) => {
  let selectedColour = context

  if (colourConfig) {
    const ParsIntBody = parseInt(body)
    for (const key in colourConfig) {
      const ParsIntKey = parseInt(key)
      if (ParsIntBody <= ParsIntKey) {
        selectedColour = colourConfig[key]
        break
      } else if (ParsIntBody > ParsIntKey) {
        selectedColour = colourConfig[key]
      }
    }
  }

  const linked = () => {
    return (
      <Link border={false} passHref to={to}>
        {tile()}
      </Link>
    )
  }

  const tile = () => {
    return (
      <StyledTile
        bgColour={selectedColour}
        className={className}
        context={context}
        rounded={rounded}
        size={size}
        shadow={shadow}
      >
        {(title || body) && (
          <TileBody description={description} size={size} title={title} body={body} />
        )}
      </StyledTile>
    )
  }
  return to ? linked() : tile()
}

const StyledTile = styled.div<{
  bgColour: string
  context: string
  shadow: string
  rounded: boolean
  size: string
}>`
  background-color: ${({ theme, bgColour, context }) => {
    return bgColour ? theme.COLOUR[bgColour] ?? bgColour : theme.COLOUR[context] ?? context
  }};
  box-shadow: ${({ shadow }) =>
    shadow && '0px 8px 10px rgba(24, 37, 50, 0.1), 0px 0px 1px rgba(24, 37, 50, 0.08)'};
  background-clip: border-box;
  border-radius: ${({ rounded }) => rounded && '0.25rem'};
  color: ${({ theme }) => theme.COLOUR.white || '#fff'};
  display: flex;
  flex-direction: column;
  margin: 0;
  min-height: ${({ theme, size }) => theme.TILE?.MIN_HEIGHT[size] || '150px'};
  min-width: 0;
  overflow: hidden;
  padding: ${({ theme, size }) => theme.TILE?.PADDING[size] || '2rem'};
  position: relative;
  width: 100%;
  word-wrap: break-word;
`

export default Tile
