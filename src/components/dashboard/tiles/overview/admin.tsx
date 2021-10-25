/**
 * Components - Dashboard - Tiles - Overview - AdminDashboardOverview
 */

// UI
import { Space } from '@drykiss/industry-ui'
import { Tiles } from './tiles/tiles'

// Types
import { ACCOUNT_TYPE } from '../../../../types/account.d'

// Hooks
import { useAggregate } from '../hooks/useTileData'

// Helpers
import { GET_ADMIN_TILES_DATA } from '../queries'
import { prepareAdminTiles } from './helpers'

export const AdminDashboardOverview = () => {
  const { error, items } = useAggregate({
    query: GET_ADMIN_TILES_DATA,
    prepareTiles: prepareAdminTiles
  })

  console.error(error)

  return (
    <>
      <Tiles accountType={ACCOUNT_TYPE.Admin} items={items} />

      <Space marginBottom="md" />
    </>
  )
}
