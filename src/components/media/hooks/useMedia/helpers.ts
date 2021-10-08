/**
 * Components - Lessons - Hooks - helpers
 */

import { nullFreeObject } from '../../../../utils/nullFreeObject'

// Types
import { LooseObject } from '../../../../types/object'

export const prepareArguments = ({ filters }: { filters?: LooseObject }): LooseObject => {
  nullFreeObject(filters)

  const whereClause: LooseObject = {}

  if (filters?.entity) {
    whereClause.entity = { _eq: filters.entity }
  }

  if (filters?.entityId) {
    whereClause.entity_id = { _eq: filters.entityId }
  }

  if (filters?.type) {
    whereClause.type = { _eq: filters.type }
  }

  if (filters?.category) {
    whereClause.category = { _eq: filters.category }
  }

  if (filters?.status) {
    whereClause.status = { _eq: filters.status }
  }

  return whereClause
}
