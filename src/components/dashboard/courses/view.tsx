/**
 * Components - Dashboard - View
 */

// UI
import { Details2 } from '@drykiss/industry-ui'
import { CourseList } from '../../courses/list'

export const DashboardView = () => {
  const filter = { isCompleted: true }
  return (
    <Details2 open title="Active/Completed courses">
      <CourseList {...filter} />
    </Details2>
  )
}
