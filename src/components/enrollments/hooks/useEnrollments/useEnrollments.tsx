/**
 * Components - Courses - List - Table - Hooks - useCourseQuery
 */

// Apollo
import { useQuery } from '@apollo/client'
import { LooseObject } from '../../../../types/object.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { GET_ENROLLMENTS } from '../../queries'
import { prepareVariables } from './helpers'
import {
  EnrollmentsFilters,
  EnrollmentsVariables,
  EnrollmentsData,
  EnrollmentsOutputData
} from './types.d'

export const useEnrollments = ({
  accountId,
  clientId,
  filters = {
    q: '',
    limit: 20,
    offset: 0,
    status: STATUS_ACTIVE.Active,
    orderBy: {
      item: 'created_by',
      order: 'asc'
    }
    // order_by: {}
  }
}: {
  accountId?: number
  clientId?: number
  filters?: EnrollmentsFilters
}): EnrollmentsOutputData => {
  const where: LooseObject = prepareVariables({ clientId, accountId, filters })

  const { data, error, loading } = useQuery<EnrollmentsData, EnrollmentsVariables>(
    GET_ENROLLMENTS,
    {
      variables: where
    }
  )

  if (error) {
    return { loading: false, error, enrollments: [] }
  }

  return { loading, enrollments: data?.enrollments || [] }
}
