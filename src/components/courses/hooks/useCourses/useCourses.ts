/**
 * Components - Courses - Hooks - UseCourses - UseCourses
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_COURSES } from '../../queries'

// Types
import { UseCourseOutput, UseCoursesProps } from './types'
import { CoursesData } from '../types'
// Helpers
import { prepareCoursesArguments } from '../helpers'

export const useCourses = ({ filters }: UseCoursesProps): UseCourseOutput => {
  const variables = prepareCoursesArguments({ filters })

  const { data, error, loading } = useQuery<CoursesData>(GET_COURSES, {
    variables
  })

  return { loading, error, courseList: data?.courses || [] }
}
