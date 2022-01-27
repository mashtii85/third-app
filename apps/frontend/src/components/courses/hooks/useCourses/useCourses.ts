/**
 * Components - Courses - Hooks - UseCourses - UseCourses
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_COURSES } from '../../queries'

// Types
import { CoursesData, UseCourseOutput, UseCoursesProps } from '@availabletowork/types'

// Helpers
import { prepareCoursesArguments } from '../helpers'

export const useCourses = ({ filters }: UseCoursesProps): UseCourseOutput => {
  const variables = prepareCoursesArguments({ filters })

  const { data, error, loading } = useQuery<CoursesData>(GET_COURSES, {
    variables
  })

  return { error, loading, courseList: data?.courses || [] }
}
