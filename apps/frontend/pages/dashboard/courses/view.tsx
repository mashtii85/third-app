/**
 * Dashboard - Courses - View
 */

// Next
import Router from 'next/router'
import type { NextPage } from 'next'

// Config
import pages from '../../../src/config/pages'

// GQL
import { ACCOUNT_TYPE } from '../../../src/types/account.d'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import { AccountCourseView, ClientCourseView } from '../../../src/components/courses/view'

// Hooks
import { useCurrentUser } from '../../../src/utils/useCurrentUser'

const PageDashboard: NextPage = () => {
  const { user } = useCurrentUser()

  if (!user) {
    Router.push(pages.account.signIn)
    return null
  } else {
    switch (user.account_type) {
      case ACCOUNT_TYPE.Client:
        return <Dashboard View={<ClientCourseView />} />
      case ACCOUNT_TYPE.Member:
        return <Dashboard View={<AccountCourseView />} />

      default:
        return <Dashboard View={<></>} />
    }
  }
}

export default PageDashboard
