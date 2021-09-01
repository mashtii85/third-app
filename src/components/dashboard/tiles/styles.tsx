/**
 * Components - Dashboard - view - tiles - styles
 */

// Styled Components
import styled from 'styled-components'
import Tile from '../components/tile'

export const StyledTile = styled<any>(Tile)`
  height: 254px;
  &:hover {
    opacity: ${({ to }) => (to ? '0.8' : '1')};
  }
`
