/**
 * Components - Courses - Hooks - UseCourse - UseCourse
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_COURSE } from '../../queries'
import { CourseData } from '../types'
import { CourseVariables } from './types'

export const useCourse = (courseId: number) => {
  const { data, error, loading, refetch } = useQuery<CourseData, CourseVariables>(GET_COURSE, {
    variables: {
      courseId
    }
  })

  if (error) {
    return { loading: false, error }
  }

  return { loading, course: data?.course, refetch }
}
