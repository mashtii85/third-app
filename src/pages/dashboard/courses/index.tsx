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

import { ACCOUNT_TYPE } from '../../../types/user.d'

const PageDashboard: NextPage = () => {
  const { user } = useContext(UserContext)

  if (!user) {
    Router.push('/account/sign-in')
    return null
  } else {
    let View
    switch (user.account_type) {
      case ACCOUNT_TYPE.Client:
        View = <Dashboard View={<ClientCourseList clientId={user.id} />} />
        break
      case ACCOUNT_TYPE.Account:
        View = View = <Dashboard View={<AccountCourseList accountId={user.id} />} />
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
