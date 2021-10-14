/**
 * Components - Lessons - Hooks - helpers
 */

import { nullFreeObject } from '../../../utils/nullFreeObject'

// Types
import { LooseObject } from '../../../types/object.d'

export const prepareArguments = ({ filters }: { filters?: LooseObject }): LooseObject => {
  nullFreeObject(filters)

  const whereClause: LooseObject = {}
  if (filters?.id) {
    whereClause.id = { _eq: filters.id }
  }

  if (filters?.moduleId) {
    whereClause.module_id = { _eq: filters.moduleId }
  }

  if (filters?.title) {
    whereClause.title = { _ilike: filters.title }
  }

  if (filters?.description) {
    whereClause.description = { _ilike: filters.description }
  }

  if (filters?.type) {
    whereClause.type = { _eq: filters.type }
  }

  if (filters?.content) {
    whereClause.contetn = { _ilike: filters.contetn }
  }

  if (filters?.status) {
    whereClause.status = { _eq: filters.status }
  }

  return whereClause
}
