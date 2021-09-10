/**
 * Components - Courses - List - Table - Hooks - useCourseQuery
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ENROLLMENTS } from '../queries'
import { EnrollmentsVariables, EnrollmentsData, EnrollmentsOutputData } from './types.d'

export const useEnrollments = ({ userId }: { userId: number }): EnrollmentsOutputData => {
  const { data, error, loading } = useQuery<EnrollmentsData, EnrollmentsVariables>(
    GET_ENROLLMENTS,
    {
      variables: {
        userId
      }
    }
  )

  if (error) {
    return { loading: false, error, enrollments: [] }
  }

  return { loading, enrollments: data?.enrollments || [] }
}
