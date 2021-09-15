/**
 * Components - Enrollments - Hooks - Helpers
 */

import { LooseObject } from '../../../../types/object'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { EnrollmentsFilters } from './types.d'

export const prepareVariables = ({
  filters,
  clientId,
  accountId
}: {
  filters?: EnrollmentsFilters
  clientId?: number
  accountId?: number
}) => {
  const variables: LooseObject = {}

  if (clientId) {
    variables.client_id = { _eq: clientId }
  } else if (accountId) {
    variables.account_id = { _eq: accountId }
  }

  if (filters?.q) {
    variables.course = {
      title: {
        _ilike: filters.q
      },
      status: { _eq: filters.status || STATUS_ACTIVE.Active }
    }
  } else {
    variables.course = {
      status: { _eq: filters?.status || STATUS_ACTIVE.Active }
    }
  }

  return {
    where: variables,
    limit: filters?.limit,
    offset: filters?.offset
    // order_by: filters?.orderBy
  }
}
