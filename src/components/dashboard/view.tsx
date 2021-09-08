/**
 * Components - Dashboard - View
 */

// React
import { useContext } from 'react'

// UI
import { Details2, UserContext } from '@drykiss/industry-ui'
import { AdminDashboardOverview } from './tiles/overview/admin'
import { ClientDashboardOverview } from './tiles/overview/client'

import { ACCOUNT_TYPE } from '../../types/user.d'
import { AccountCourseList } from '../courses/list'

export const DashboardView = () => {
  const { user } = useContext(UserContext)

  const renderSwitch = (type: ACCOUNT_TYPE) => {
    switch (type) {
      case ACCOUNT_TYPE.Client:
        return <ClientDashboardOverview clientId={user.id} />
      case ACCOUNT_TYPE.Account:
        return (
          <Details2 open title="Courses in progress">
            <AccountCourseList accountId={user.id} />
          </Details2>
        )
      case ACCOUNT_TYPE.Admin:
        return (
          <Details2 open title="Courses in progress">
            <AdminDashboardOverview adminId={user.id} />
          </Details2>
        )
      default:
        break
    }
  }
  return <>{renderSwitch(user.account_type)}</>
}
