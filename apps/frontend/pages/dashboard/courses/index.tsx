/**
 * Dashboard
 */

// Next
import Router from 'next/router'
import type { NextPage } from 'next'

// Config
import pages from '../../../src/config/pages'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import { AccountCourseList, ClientCourseList } from '../../../src/components/courses/list'

// Hooks
import { useCurrentUser } from '../../../src/utils/useCurrentUser'

// GQL
import { ACCOUNT_TYPE } from '../../../src/types/account.d'

const PageDashboard: NextPage = () => {
  const { user } = useCurrentUser()

  if (!user) {
    Router.push(pages.account.signIn)
    return null
  } else {
    let View
    switch (user.account_type) {
      case ACCOUNT_TYPE.Client:
        View = <Dashboard View={<ClientCourseList accountId={user.account_id} />} />
        break
      case ACCOUNT_TYPE.Member:
        View = View = <Dashboard View={<AccountCourseList />} />
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
