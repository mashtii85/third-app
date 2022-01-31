/**
 * Components - Courses - Hooks - UseCourse - UseCourse
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_COURSE } from '@availabletowork/queries'
import { CourseData, CourseVariables } from '@availabletowork/types'

export const useCourse = (courseId: number) => {
  const { data, error, loading, refetch } = useQuery<CourseData, CourseVariables>(GET_COURSE, {
    variables: {
      courseId
    }
  })

  return { error, loading, course: data?.course, refetch }
}
