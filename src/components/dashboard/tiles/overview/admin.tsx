/**
 * Components - Dashboard - Tiles - Overview
 */

// UI
import { Row, Space } from '@drykiss/industry-ui'

// Types
import { ACCOUNT_TYPE } from '../../../../types/account.d'

// Hooks
import { useAggregate } from '../hooks/useTileData'

// Helpers
import { TileItem } from './helpers'
import { GET_ADMIN_TILES_DATA } from '../queries'
import { prepareAdminTiles } from '../helper'

export const AdminDashboardOverview = () => {
  const { error, items } = useAggregate({
    query: GET_ADMIN_TILES_DATA,
    prepareTiles: prepareAdminTiles
  })

  console.log(error)

  return (
    <>
      <Row justify="start">
        {items.map((item) => (
          <TileItem
            key={item.title}
            accountType={ACCOUNT_TYPE.Admin}
            title={item.title}
            to={item.to}
            colourConfig={item.colourConfig}
            value={item.value}
          />
        ))}
      </Row>

      <Space marginBottom="md" />
    </>
  )
}
