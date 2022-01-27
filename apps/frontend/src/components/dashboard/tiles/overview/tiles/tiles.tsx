/**
 * Components - Dashboard - Tiles - Overview - Tiles
 */
// UI
import { Row } from '@drykiss/industry-ui'

// Types
import { ACCOUNT_TYPE, DashboardTile } from '@availabletowork/types'

// Helpers
import { TileItem } from './helpers'

export const Tiles = ({
  items,
  accountType
}: {
  items: DashboardTile[]
  accountType: ACCOUNT_TYPE
}) => {
  return (
    <Row justify="start">
      {items.map((item) => (
        <TileItem
          key={item.title}
          accountType={accountType}
          title={item.title}
          to={item.to}
          colourConfig={item.colourConfig}
          value={item.value}
        />
      ))}
    </Row>
  )
}
