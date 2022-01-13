/**
 * Dashboard
 */

// Next
import Router from 'next/router'
import { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import { DashboardView } from '../src/components/dashboard/view'

// Hooks
import { useCurrentUser } from '../src/utils/useCurrentUser'

const PageDashboard: NextPage = () => {
  const { user } = useCurrentUser()

  if (!user) {
    Router.push('/account/sign-in')
    return null
  } else {
    return <Dashboard View={<DashboardView />} />
  }
}

export default PageDashboard
