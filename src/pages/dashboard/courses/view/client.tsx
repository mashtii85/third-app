/**
 * Dashboard - Courses - View
 */

// Next
import type { NextPage } from 'next'

// UI
import { Dashboard } from '@drykiss/industry-ui'
import View from '../../../../components/courses/view'

const PageDashboard: NextPage = () => {
  return (
    <Dashboard
      pageHeading={{
        heading: 'Course'
      }}
      View={<View />}
    />
  )
}

export default PageDashboard
