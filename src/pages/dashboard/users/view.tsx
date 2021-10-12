/**
 * Dashboard - Users - Profile
 *
 * Displays user details for the user ID from url
 */

// Next
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import { Loading } from '../../../components/common/loading'
import View from '../../../components/users/view'

const PageUserView: NextPage = () => {
  const { query } = useRouter()

  const userId: number = +(query?.id || '0')

  if (!userId) {
    return <Loading />
  }

  return <Dashboard View={<View userId={userId} />} />
}

export default PageUserView
