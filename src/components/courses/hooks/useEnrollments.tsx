/**
 * Components - Courses - List - Table - Hooks - useCourseQuery
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ENROLLMENTS } from '../queries'
import { EnrolledVariables, EnrollmentsData, EnrolmentOutputData } from './types.d'

export const useEndrollments = ({ userId }: { userId: number }): EnrolmentOutputData => {
  const { data, error, loading } = useQuery<EnrollmentsData, EnrolledVariables>(GET_ENROLLMENTS, {
    variables: {
      userId
    }
  })

  if (error) {
    return { loading: false, error, enrollments: [] }
  }

  return { loading, enrollments: data?.enrollments || [] }
}
