/**
 * Dashboard - Events - Index
 */

// Next
import type { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import { EventList } from '../../../src/components/events/list'
import { useCurrentUser } from '../../../src/utils/useCurrentUser'

const PageLocationsView: NextPage = () => {
  const { user } = useCurrentUser()
  return <Dashboard View={<EventList accountId={user.account_id} />} />
}

export default PageLocationsView
