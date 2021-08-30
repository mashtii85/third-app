/**
 * Components - Dashboard - View
 */

// UI
import { Details2 } from '@drykiss/industry-ui'
import { CourseList } from '../courses/list'

export const DashboardView = () => {
  return (
    <Details2 open title="Courses in progress">
      <CourseList isCompleted={false} />
    </Details2>
  )
}
