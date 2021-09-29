/**
 * Dashboard - Locations - Index
 */

// Next
import type { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import { LocationList } from '../../../components/locations/list'
import { useCurrentUser } from '../../../utils/useCurrentUser'

const PageLocationsView: NextPage = () => {
  const { user } = useCurrentUser()
  return <Dashboard View={<LocationList accountId={user.account_id} />} />
}

export default PageLocationsView
