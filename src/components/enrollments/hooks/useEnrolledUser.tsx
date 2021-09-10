/**
 * Components - Enrollments - Hooks - UseEnrolledUser
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ENROLLED_USER } from '../queries'
import { EnrolledUserVariables, EnrolledUserData, EnrolledUserOutputData } from './types'

export const useEnrolledUser = (courseId: number): EnrolledUserOutputData => {
  const { data, error, loading } = useQuery<EnrolledUserData, EnrolledUserVariables>(
    GET_ENROLLED_USER,
    {
      variables: {
        courseId
      }
    }
  )

  if (error) {
    return { loading: false, error, enrollments: [] }
  }

  return { loading, enrollments: data?.enrollments || [] }
}
