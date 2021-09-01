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
import { CourseList } from '../../../components/courses/list/list'
import { CourseTable } from '../../../components/courses/list/table/table'
import { Courses } from '../../../mocks/courses'

const PageDashboard: NextPage = () => {
  const { user } = useContext(UserContext)

  if (!user) {
    Router.push('/account/sign-in')
    return null
  } else {
    let View
    switch (user.account_type) {
      case 'admin':
        View = <Dashboard View={<CourseTable />} />
        break

      case 'user':
        View = <Dashboard View={<CourseList courses={Courses} />} />
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
