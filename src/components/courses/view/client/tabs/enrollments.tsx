/**
 * Components - Courses - View - Client - Tabs - Enrollments
 */

import { useEnrolledUser } from '../../../../enrollments/hooks'

export const ClientUserEnrollments = ({ courseId }: { courseId: number }) => {
  const { enrollments, loading, error } = useEnrolledUser(courseId)
  if (error) {
    console.log(error.message)
  }
  if (loading) {
    console.log('loading')
  }

  return (
    <>
      Enrollments
      {enrollments.map((item) => {
        return JSON.stringify(item)
      })}
      <p>data fetched already</p>
    </>
  )
}
