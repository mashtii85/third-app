/**
 * Components - Courses - List - Table - Hooks - useCourseQuery
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_COURSES } from '../queries'
import { CoursesData, CoursesVariables, UserCoursesProps } from './types'
import { prepareArguments } from './helpers'

export const useCourses = ({ clientId, filters }: UserCoursesProps) => {
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
