/**
 * Components - Courses - View - Client - Tabs - Details
 */

import { EnrolledUsersList } from '../../../../enrollments/lists/enrolledUsers/enrolledUsers'

export const EnrolledCourses = ({ courseId }: { courseId: number }) => {
  return <EnrolledUsersList courseId={courseId} />
}
