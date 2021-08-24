/**
 * Dashboard
 */

// React
import { useContext } from 'react'

// Next
import Router from 'next/router'
import type { NextPage } from 'next'

// UI
import { Dashboard, UserContext  } from '@drykiss/industry-ui'
import { DashboardView } from '../../components/dashboard/view'

const PageDashboard: NextPage = () => {
  const { user } = useContext(UserContext)

  if (!user) {
    Router.push('/account/sign-in')
    return null
  } else {
    return (
      <Dashboard View={<DashboardView />} />
    )
  }
}

export default PageDashboard
