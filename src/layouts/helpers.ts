/**
 * Layouts -  List
 */

// Types
import { LooseObject } from '../types/object'

export const prepareFiltersFromQuery = (query: LooseObject): LooseObject => {
  const { q, type, ...filters } = query
  if (q) {
    filters.q = `%${q}%`
  }
  if (type) {
    filters.taxonomy = { key: '', value: type }
  }

  return filters
}
