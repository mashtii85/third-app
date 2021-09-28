/**
 * Components - Courses - Hooks - useCourse
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_COURSE } from '../queries'
import { CourseData, CourseVariables } from './types.d'

export const useCourse = (courseId: number) => {
  const { data, error, loading } = useQuery<CourseData, CourseVariables>(GET_COURSE, {
    variables: {
      courseId
    }
  })

  if (error) {
    return { loading: false, error }
  }

  return { loading, course: data?.course }
}
