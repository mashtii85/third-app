/**
 * Components - Dashboard - View
 */

// React
import { useContext } from 'react'

// UI
import { Details2, UserContext } from '@drykiss/industry-ui'
// import { AdminDashboardOverview } from './tiles/overview/admin'
import { ClientDashboardOverview } from './tiles/overview/client'

import { ACCOUNT_TYPE } from '../../types/account.d'
import { AccountCourseList } from '../courses/list'

export const DashboardView = () => {
  const { user } = useContext(UserContext)

  const renderSwitch = (type: ACCOUNT_TYPE) => {
    switch (type) {
      case ACCOUNT_TYPE.Client:
        return <ClientDashboardOverview clientId={user.client_id} />

      // todo: this is not right
      case ACCOUNT_TYPE.Account:
        return (
          <Details2 open title="Courses in progress">
            <AccountCourseList accountId={user.account_id} />
          </Details2>
        )
      case ACCOUNT_TYPE.Admin:
        return <div>TODO</div>
      default:
        break
    }
  }
  return <>{renderSwitch(user.account_type)}</>
}
