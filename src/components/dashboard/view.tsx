/**
 * Components - Dashboard - View
 */

// UI
import { Details2 } from '@drykiss/industry-ui'
import { AdminDashboardOverview } from './tiles/overview/admin'
import { ClientDashboardOverview } from './tiles/overview/client'
import { ACCOUNT_TYPE } from '../../types/account.d'
import { AccountCourseList } from '../courses/list'

// Hooks
import { useCurrentUser } from '../../utils/useCurrentUser'

export const DashboardView = () => {
  const { user } = useCurrentUser()

  const renderSwitch = (type: ACCOUNT_TYPE): JSX.Element => {
    switch (type) {
      case ACCOUNT_TYPE.Client:
        return <ClientDashboardOverview clientId={user.client_id} />

      // todo: this is not right
      case ACCOUNT_TYPE.Member:
        return (
          <Details2 open title="Courses in progress">
            <AccountCourseList show="enrolled" />
          </Details2>
        )
      case ACCOUNT_TYPE.Admin:
        return <AdminDashboardOverview />
      default:
        return <></>
    }
  }
  return <>{renderSwitch(user.account_type)}</>
}
