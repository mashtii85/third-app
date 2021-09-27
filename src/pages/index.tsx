/**
 * Home
 */

// Next
import Router from 'next/router'
import type { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import { DashboardView } from '../components/dashboard/view'

// Hooks
import { useCurrentUser } from '../utils/useCurrentUser'

const Home: NextPage = () => {
  const { user } = useCurrentUser()

  if (!user) {
    Router.push('/account/sign-in')
    return null
  } else {
    return <Dashboard View={<DashboardView />} />
  }
}

export default Home
