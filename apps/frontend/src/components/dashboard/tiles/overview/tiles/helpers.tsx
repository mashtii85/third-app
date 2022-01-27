/**
 * Components - Dashboard - Tiles - Overview - Helpers
 */

// UI
import { Column, Tile } from '@drykiss/industry-ui'

// Types
import { ACCOUNT_TYPE, TileItemProps } from '@availabletowork/types'

export const TileItem = ({ title, to, accountType, value, colourConfig }: TileItemProps) => (
  <Column
    md={4}
    lg={accountType === ACCOUNT_TYPE.Client ? 2 : 3}
    sm={6}
    style={{ marginBottom: '1.8em' }}
  >
    <Tile rounded title={title} size="sm" colourConfig={colourConfig} to={to} body={value} />
  </Column>
)
