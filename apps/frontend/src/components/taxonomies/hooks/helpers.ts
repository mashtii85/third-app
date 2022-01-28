/**
 * Components - Taxonomies - Hooks - helpers
 */

import { nullFreeObject } from '../../../utils/nullFreeObject'

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { LooseObject, TaxonomyFilters } from '@availabletowork/types'

export const prepareTaxonomyArguments = (filters?: TaxonomyFilters): LooseObject => {
  nullFreeObject(filters)
  const whereClause: LooseObject = { status: { _eq: STATUS_ACTIVE.Active } }

  if (filters?.status === STATUS_ACTIVE.Inactive) {
    whereClause.status = { _eq: filters.status }
  }

  // Why using "category" instead of the column name "type"?
  if (filters?.type) {
    whereClause.type = { _eq: filters.type }
  }

  if (filters?.id) {
    whereClause.id = { _eq: filters.id }
  }

  if (filters?.clientId) {
    whereClause.client_id = { _eq: filters.clientId }
  }

  if (filters?.parentId) {
    whereClause.parent_id = { _eq: filters.parentId }
  } else {
    whereClause.parent_id = { _is_null: true }
  }

  if (filters?.entity) {
    whereClause.entity = { _eq: filters.entity }
  }

  if (filters?.entityId) {
    whereClause.entity_id = { _eq: filters.entityId }
  }

  return { where: whereClause }
}
