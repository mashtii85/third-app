/**
 * Components - Dashboard - View
 */

// UI
import { Details2 } from '@drykiss/industry-ui'
import { CourseList } from '../courses/list'

import { Courses } from '../../mocks/courses'

export const DashboardView = () => {
  const courses = [...Courses]
  const filteredCourses = courses.filter((item) => item.progress !== 100)

  return (
    <Details2 open title="Courses in progress">
      <CourseList courses={filteredCourses} />
    </Details2>
  )
}
