/**
 * Components - Dashboard - View
 */

// UI
import { Details } from '@drykiss/industry-ui'
import { AdminDashboardOverview } from './tiles/overview/admin'
import { ClientDashboardOverview } from './tiles/overview/client'
import { AccountCourseList } from '../courses/list'

//Types
import { ACCOUNT_TYPE } from '@availabletowork/constants'

// Hooks
import { useCurrentUser } from '../../utils/useCurrentUser'

export const DashboardView = () => {
  const { user } = useCurrentUser()

  const renderSwitch = (type: ACCOUNT_TYPE): JSX.Element => {
    console.log('type', type)
    switch (type) {
      case ACCOUNT_TYPE.Client:
        return <ClientDashboardOverview clientId={user.client_id} />

      // todo: this is not right
      case ACCOUNT_TYPE.Member:
        return (
          <Details open title="Courses in progress">
            <AccountCourseList show="enrolled" />
          </Details>
        )
      case ACCOUNT_TYPE.Admin:
        return <AdminDashboardOverview />
      default:
        return <></>
    }
  }

  return <>{renderSwitch(user.account_type)}</>
}
