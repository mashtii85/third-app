/**
 * Dashboard - Lessons - View
 */

// Next
import Router from 'next/router'
import type { NextPage } from 'next'

// Types
import { ACCOUNT_TYPE, pages } from '@availabletowork/constants'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import { LessonView } from '../../../src/components/lessons/view'

// Hooks
import { useCurrentUser } from '../../../src/utils/useCurrentUser'

const PageDashboard: NextPage = () => {
  const { user } = useCurrentUser()

  if (!user) {
    Router.push(pages.account.signIn)
    return null
  } else if (user.account_type !== ACCOUNT_TYPE.Client) return null

  return <Dashboard key="lesson-view" View={<LessonView user={user} />} />
}

export default PageDashboard
