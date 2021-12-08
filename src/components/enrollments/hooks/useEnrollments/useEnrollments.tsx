/**
 * Components - Enrollments - Hooks - UseEnrolledUsers - UseEnrolledUsers
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ENROLLMENTS } from '../../queries'

// Helpers
import { prepareVariables } from './helpers'

// Types
import { LooseObject } from '../../../../types/object'
import {
  EnrollmentVariables,
  EnrollmentData,
  EnrollmentOutputData,
  EnrollmentFilters
} from './types'
import { STATUS_ACTIVE } from '../../../../types/select.d'

export const useEnrollments = ({
  filters = {
    q: '',
    limit: 20,
    offset: 0,
    status: STATUS_ACTIVE.Active,
    orderBy: {
      created_by: 'asc'
    },
    userStatus: STATUS_ACTIVE.Active

    // order_by: {}
  }
}: {
  filters?: Partial<EnrollmentFilters>
}): EnrollmentOutputData => {
  const where: LooseObject | null = prepareVariables({ filters })
  const { data, error, loading } = useQuery<EnrollmentData, EnrollmentVariables>(GET_ENROLLMENTS, {
    variables: {
      where
    }
  })

  return { error, loading, enrollments: data?.enrollments || [] }
}
