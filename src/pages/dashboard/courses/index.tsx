/**
 * Dashboard
 */

// React
import { useContext } from 'react'

// Next
import Router from 'next/router'
import type { NextPage } from 'next'

// UI
import { Dashboard, UserContext } from '@drykiss/industry-ui'
import { AccountCourseList, ClientCourseList } from '../../../components/courses/list'

import { ACCOUNT_TYPE } from '../../../types/account.d'
import pages from '../../../config/pages.json'

const PageDashboard: NextPage = () => {
  const { user } = useContext(UserContext)

  if (!user) {
    Router.push(pages.account.signIn)
    return null
  } else {
    let View
    switch (user.account_type) {
      case ACCOUNT_TYPE.Client:
        View = <Dashboard View={<ClientCourseList clientId={user.client_id} />} />
        break
      case ACCOUNT_TYPE.Account:
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
