/**
 * Components - Dashboard - Tiles - Overview
 */

// UI
import { Row, Space } from '@drykiss/industry-ui'

// Types
import type { AdminDashboardOverviewProps } from '../types.d'
import { ACCOUNT_TYPE } from '../../../../types/account.d'

// Hooks
import { useAggregate } from '../hooks/useTileData'

// Helpers
import { TileItem } from './helpers'
import { GET_TILES_DATA } from '../queries'
import { prepareClientTiles } from '../helper'

export const AdminDashboardOverview = ({ adminId }: AdminDashboardOverviewProps) => {
  const { error, items } = useAggregate({
    accountId: adminId,
    query: GET_TILES_DATA,
    prepareTiles: prepareClientTiles
  })

  if (error) {
    console.error(error)
  }

  return (
    <>
      <Row justify="start">
        {items.map((item) => (
          <TileItem
            key={item.title}
            accountType={ACCOUNT_TYPE.Client}
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
