/**
 * Components - Enrollments - Hooks - UseEnrolledUsers - UseEnrolledUsers
 */

// React
import { useContext } from 'react'

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ENROLLED_USERS } from '../../queries'

// UI
import { UserContext } from '@drykiss/industry-ui'

// Helpers
import { prepareVariables } from './helpers'

// Types
import { LooseObject } from '../../../../types/object.d'
import {
  EnrolledUsersVariables,
  EnrolledUsersData,
  EnrolledUsersOutputData,
  EnrolledUsersFilters
} from './types.d'

export const useEnrolledUsers = ({
  courseId,
  filters
}: {
  courseId: number
  filters?: EnrolledUsersFilters
}): EnrolledUsersOutputData => {
  const { user } = useContext(UserContext)
  const where: LooseObject | null = prepareVariables({
    clientId: user.client_id,
    courseId,
    filters
  })

  const { data, error, loading } = useQuery<EnrolledUsersData, EnrolledUsersVariables>(
    GET_ENROLLED_USERS,
    {
      variables: {
        where
      }
    }
  )

  if (error) {
    return { loading: false, error, enrollments: [] }
  }

  return { loading, enrollments: data?.enrollments || [] }
}
