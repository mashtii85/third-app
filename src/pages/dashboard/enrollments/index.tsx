/**
 * Dashboard
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
import { Enrollments } from '../../../components/enrollments/list/enrollments'

// Hooks
import { useCurrentUser } from '../../../utils/useCurrentUser'

const PageDashboard: NextPage = () => {
  const { user } = useCurrentUser()

  if (!user) {
    Router.push(pages.account.signIn)
    return null
  } else {
    let View
    switch (user.account_type) {
      case ACCOUNT_TYPE.Client:
        View = <Dashboard View={<Enrollments />} />
        break
      case ACCOUNT_TYPE.Member:
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
