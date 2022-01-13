/**
 * Components - Courses - View - Client - Tabs - Details
 */

import { Enrollments } from '../../../../enrollments/list/enrollments'

export const EnrolledCourses = ({ courseId }: { courseId: number }) => {
  return <Enrollments courseId={courseId} />
}
