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
        View = <Dashboard View={<ClientCourseView />} />
        break
      case ACCOUNT_TYPE.Account:
        View = View = (
          <Dashboard
            View={
              <AccountCourseView
              // accountId={user.id}
              />
            }
          />
        )
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
