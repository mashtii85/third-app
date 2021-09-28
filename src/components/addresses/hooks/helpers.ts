/**
 * Components - Lessons - Hooks - helpers
 */

import { nullFreeObject } from '../../../utils/nullFreeObject'

// Types
import { LooseObject } from '../../../types/object'

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
    whereClause.meta = { _contains: { type: filters.type } }
  }

  if (filters?.name) {
    whereClause.name = { _ilike: filters.name }
  }

  if (filters?.line1) {
    whereClause.line1 = { _ilike: filters.line1 }
  }

  if (filters?.line2) {
    whereClause.line2 = { _ilike: filters.line2 }
  }

  if (filters?.line2) {
    whereClause.line2 = { _ilike: filters.line2 }
  }

  if (filters?.city) {
    whereClause.city = { _ilike: filters.city }
  }

  if (filters?.postcode) {
    whereClause.postcode = { _ilike: filters.postcode }
  }

  if (filters?.county) {
    whereClause.county = { _ilike: filters.county }
  }

  if (filters?.status) {
    whereClause.status = { _eq: filters.status }
  }

  return whereClause
}
