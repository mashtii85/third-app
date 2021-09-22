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

  return { where: whereClause }
}
