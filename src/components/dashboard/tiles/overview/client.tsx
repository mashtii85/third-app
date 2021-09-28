/**
 * Components - Dashboard - Tiles - Overview
 */

// UI
import { Row, Space } from '@drykiss/industry-ui'

// Types
import type { ClientDashboardOverviewProps } from '../types.d'
import { ACCOUNT_TYPE } from '../../../../types/account.d'

// Hooks
import { useAggregate } from '../hooks/useTileData'

import { GET_CLIENT_TILES_DATA } from '../queries'
// Helpers
import { TileItem } from './helpers'
import { prepareClientTiles } from '../helper'

export const ClientDashboardOverview = ({ clientId }: ClientDashboardOverviewProps) => {
  const { error, items } = useAggregate({
    clientId,
    query: GET_CLIENT_TILES_DATA,
    prepareTiles: prepareClientTiles
  })

  console.log(error)

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
