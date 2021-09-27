/**
 * Components - Courses - List - Table - Hooks - helpers
 */

import { nullFreeObject } from '../../../utils/nullFreeObject'

// Types
import { LooseObject } from '../../../types/object.d'
import { UseTaxonomiesVariable } from './types'

export const prepareTaxonomyArguments = (filters: UseTaxonomiesVariable): LooseObject => {
  nullFreeObject(filters)
  const whereClause: LooseObject = {}

  // Why using "category" instead of the column name "type"?
  if (filters?.category) {
    whereClause.type = { _eq: filters.category }
  }

  if (filters?.id) {
    whereClause.id = { _eq: filters.id }
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
