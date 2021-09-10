/**
 * Components - Courses - View - Client - Tabs - Details
 */

import { useCourse } from '../../../hooks'

export const ClientDetails = ({ courseId }: { courseId: number }) => {
  const { course, loading, error } = useCourse(courseId)
  console.log(course)
  if (error) {
    console.log(error.message)
  }
  if (loading) {
    console.log('loading')
  }
  return (
    <>
      Details<p>data fetched already</p>
    </>
  )
}
