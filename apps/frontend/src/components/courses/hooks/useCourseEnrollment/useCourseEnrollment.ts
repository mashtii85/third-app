/**
 * Components - Courses - Hooks - UseCourse - UseCourse
 */

// Apollo
import { useQuery } from '@apollo/client'
import { COURSE_ENROLLMENT } from '../../queries'
import { CoursesData } from '@availabletowork/types'

export const useCourseEnrollment = (accountId: number, userId: number): any => {
  const { data, error, loading, refetch } = useQuery<CoursesData, any>(COURSE_ENROLLMENT, {
    variables: {
      accountId,
      userId
    }
  })

  return { error, loading, courseList: data?.courses, refetch }
}
