/**
 * Components - Dashboard - View
 */

// UI
import { Details2 } from '@drykiss/industry-ui'
import { Courses } from '../../../mocks/courses'
import { CourseList } from '../../courses/list'

export const DashboardView = () => {
  const courses = [...Courses]
  const filteredCourses = courses.filter((item) => item.progress === 100)

  return (
    <Details2 open title="Active/Completed courses">
      <CourseList courses={filteredCourses} />
    </Details2>
  )
}
