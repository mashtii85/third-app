/**
 * Dashboard - Lessons - View
 */

// Next
import Router from 'next/router'
import type { NextPage } from 'next'

// Config
import pages from '../../../config/pages'

// GQL
import { ACCOUNT_TYPE } from '../../../types/account.d'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import { LessonView } from '../../../components/lessons/view'

// Hooks
import { useCurrentUser } from '../../../utils/useCurrentUser'

const PageDashboard: NextPage = () => {
  const { user } = useCurrentUser()

  if (!user) {
    Router.push(pages.account.signIn)
    return null
  } else if (user.account_type !== ACCOUNT_TYPE.Client) return null

  return <Dashboard key="lesson-view" View={<LessonView user={user} />} />
}

export default PageDashboard
