/**
 * Dashboard - Users -View
 *
 * Displays user details for the currently logged in user
 */

// Next
import type { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import View from '../../../src/components/users/view'
import { useCurrentUser } from '../../../src/utils/useCurrentUser'

const PageUserProfile: NextPage = () => {
  const { user } = useCurrentUser()

  return <Dashboard View={<View userId={user.id} />} />
}

export default PageUserProfile
