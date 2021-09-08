/**
 * Components - Courses - List - Table - Hooks - helpers
 */

import { nullFreeObject } from '../../../utils/nullFreeObject'

// Types
import { STATUS_ACTIVE } from '../../../types/select.d'
import { LooseObject } from '../../../types/object.d'

export const prepareArguments = ({
  filters,
  clientId
}: {
  filters?: LooseObject
  clientId: number
}) => {
  // if (!filters) return { whereClause: '', variables: {} }
  nullFreeObject(filters)

  const whereClause: LooseObject = {}
  whereClause.client_id = { _eq: clientId }

  if (filters?.q) {
    whereClause.title = { _ilike: filters.q }
  }

  if (filters?.status) {
    whereClause.status = { _eq: filters.status }
  } else {
    whereClause.status = { _eq: STATUS_ACTIVE.Active }
  }

  if (filters?.description) {
    whereClause.description = { _ilike: filters.description }
  }

  return whereClause
}
