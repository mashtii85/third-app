/**
 * Components - Dashboard - Tiles - Overview - ClientDashboardOverview
 */

// UI
import { Space } from '@drykiss/industry-ui'

// Types
import type { ClientDashboardOverviewProps } from '../types.d'
import { ACCOUNT_TYPE } from '../../../../types/account.d'

// Hooks
import { useAggregate } from '../hooks/useTileData'

import { GET_CLIENT_TILES_DATA } from '../queries'
// Helpers
import { EventsCalendar } from '../../../events/calendar/calendar'
import { Tiles } from './tiles/tiles'
import { prepareClientTiles } from './helpers'

export const ClientDashboardOverview = ({ clientId }: ClientDashboardOverviewProps) => {
  const { error, items } = useAggregate({
    clientId,
    query: GET_CLIENT_TILES_DATA,
    prepareTiles: prepareClientTiles
  })

  console.error(error)

  return (
    <div data-cy="ClientDashboard">
      {/* <div data-cy="client-tiles"> */}
      <Tiles data-cy={'client-tiles'} accountType={ACCOUNT_TYPE.Client} items={items} />
      {/* </div> */}

      <Space marginBottom="md" />

      <EventsCalendar />
    </div>
  )
}
