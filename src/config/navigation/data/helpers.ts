/**
 * Navigation - Data - Helpers
 */

// Types
import type { NavLink } from '../../../types/navigation'
import { Taxonomy, TAXONOMY_TYPE } from '../../../types/taxonomy.d'

export const prepareTaxonomyNavigation = (
  taxonomies: Partial<Taxonomy[]>,
  type: TAXONOMY_TYPE
): NavLink[] => {
  if (!taxonomies?.length) {
    return []
  }

  const list: NavLink[] = taxonomies
    .filter((t) => t?.type === type)
    .map((t) => {
      return {
        id: `navItems${t?.name}`,
        name: t?.name,
        to: `/items?type=${t?.id}`
      }
    })
  list.push({
    id: `navDivider${type}`,
    divider: true
  })

  return list
}
