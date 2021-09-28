/**
 * Dashboard
 */

// Next
import Router from 'next/router'
import type { NextPage } from 'next'

// Config
import pages from '../../../config/pages'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import { AccountCourseList, ClientCourseList } from '../../../components/courses/list'

// Hooks
import { useCurrentUser } from '../../../utils/useCurrentUser'

// GQL
import { ACCOUNT_TYPE } from '../../../types/account.d'

const PageDashboard: NextPage = () => {
  const { user } = useCurrentUser()

  if (!user) {
    Router.push(pages.account.signIn)
    return null
  } else {
    let View
    switch (user.account_type) {
      case ACCOUNT_TYPE.Client:
        View = <Dashboard View={<ClientCourseList clientId={user.client_id} />} />
        break
      case ACCOUNT_TYPE.Member:
        View = View = <Dashboard View={<AccountCourseList accountId={user.account_id} />} />
        break

      default:
        View = <></>
    }
    return (
      <Dashboard
        pageHeading={{
          heading: 'Courses'
        }}
        View={View}
      />
    )
  }
}

export default PageDashboard
