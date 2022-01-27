/**
 * Layouts -  Helpers
 */

// Types
import { LooseObject, Taxonomy } from '@availabletowork/types'

export const prepareFiltersFromQuery = (
  query: LooseObject,
  taxonomies: Taxonomy[] = []
): LooseObject => {
  const { q, type, ...filters } = query

  if (q) {
    filters.q = `%${q}%`
  }

  if (type) {
    const taxonomy = taxonomies.find((t) => t.id === parseInt(type))
    filters.taxonomy = { label: taxonomy ? taxonomy.name : '', value: parseInt(type) }
  }

  return filters
}
