/**
 * Components - Dashboard - Tiles - Overview - Helpers
 */

// UI
import { Column, Tile } from '@drykiss/industry-ui'

// Constants
import { ACCOUNT_TYPE } from '@availabletowork/constants'

// Types
import { TileItemProps } from '@availabletowork/types'

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
