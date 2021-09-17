/**
 * Dashboard - Courses - View
 */

// React
import { useContext } from 'react'

// Next
import Router from 'next/router'
import type { NextPage } from 'next'

import { ACCOUNT_TYPE } from '../../../types/account.d'
// UI
import { Dashboard, UserContext } from '@drykiss/industry-ui'
import { AccountCourseView, ClientCourseView } from '../../../components/courses/view'

import pages from '../../../config/pages'

const PageDashboard: NextPage = () => {
  const { user } = useContext(UserContext)
  if (!user) {
    Router.push(pages.account.signIn)
    return null
  } else {
    switch (user.account_type) {
      case ACCOUNT_TYPE.Client:
        return <Dashboard View={<ClientCourseView />} />
      case ACCOUNT_TYPE.Account:
        return (
          <Dashboard
            View={<AccountCourseView />}
            pageHeading={{
              heading: 'Course Details'
            }}
          />
        )

      default:
        return <Dashboard View={<></>} />
    }
  }
}

export default PageDashboard
