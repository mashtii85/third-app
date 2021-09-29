/**
 * Components - Courses - Hooks - useCourses
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_COURSES } from '../queries'

// Types
import { CoursesData, CoursesVariables, UseCourseOutput, UseCoursesProps } from './types'

// Helpers
import { prepareCoursesArguments } from './helpers'

export const useCourses = ({ accountId, filters }: UseCoursesProps): UseCourseOutput => {
  const variables = prepareCoursesArguments({ filters, accountId })
  const { data, error, loading } = useQuery<CoursesData, CoursesVariables>(GET_COURSES, {
    variables
  })

  if (error) {
    return { loading: false, error, courseList: [] }
  }

  return { loading, courseList: data?.courses || [] }
}
