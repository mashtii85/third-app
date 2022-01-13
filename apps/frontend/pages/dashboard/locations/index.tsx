/**
 * Dashboard - Locations - Index
 */

// Next
import type { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import { LocationList } from '../../../src/components/locations/list'
import { useCurrentUser } from '../../../src/utils/useCurrentUser'

const PageLocationsView: NextPage = () => {
  const { user } = useCurrentUser()
  return <Dashboard View={<LocationList accountId={user.account_id} />} />
}

export default PageLocationsView

// export async function getServerSideProps({ query }) {
//   return { props: { query } }
// }
