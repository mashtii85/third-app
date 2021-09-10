/**
 * Components - Courses - Hooks - useCourses
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_COURSES } from '../queries'
import { CoursesData, CoursesVariables, UseCoursesProps } from './types'
import { prepareArguments } from './helpers'

export const useCourses = ({ clientId, filters }: UseCoursesProps) => {
  const where = prepareArguments({ filters, clientId })
  const { data, error, loading } = useQuery<CoursesData, CoursesVariables>(GET_COURSES, {
    variables: {
      where
    }
  })

  if (error) {
    return { loading: false, error, courseList: [] }
  }

  return { loading, courseList: data?.courses || [] }
}
