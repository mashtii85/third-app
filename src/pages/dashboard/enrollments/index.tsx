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

import { ACCOUNT_TYPE } from '../../../types/account.d'
import pages from '../../../config/pages'
import { Enrollments } from '../../../components/enrollments/list/enrollments'

const PageDashboard: NextPage = () => {
  const { user } = useContext(UserContext)

  if (!user) {
    Router.push(pages.account.signIn)
    return null
  } else {
    let View
    switch (user.account_type) {
      case ACCOUNT_TYPE.Client:
        View = <Dashboard View={<Enrollments />} />
        break
      case ACCOUNT_TYPE.Account:
        View = View = <div>not implemented</div>
        break

      default:
        View = <></>
    }
    return (
      <Dashboard
        pageHeading={{
          heading: 'Enrollments'
        }}
        View={View}
      />
    )
  }
}

export default PageDashboard
