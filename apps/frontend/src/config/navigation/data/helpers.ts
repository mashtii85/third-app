/**
 * Navigation - Data - Helpers
 */

// Constants
import { TAXONOMY_TYPE } from '@availabletowork/constants'

// Types
import { NavLink, Taxonomy } from '@availabletowork/types'

export const prepareTaxonomyNavigation = (
  taxonomies: Taxonomy[] = [],
  type: TAXONOMY_TYPE
): Partial<NavLink>[] => {
  if (!taxonomies?.length) {
    return []
  }

  // Temp override for members/accounts
  let urlType: string = type
  if (type === TAXONOMY_TYPE.Member || type === TAXONOMY_TYPE.Client) {
    urlType = 'accounts'
  }

  const list: Partial<NavLink>[] = taxonomies
    .filter((t) => t?.type === type)
    .map((t) => {
      return {
        id: `navItems${t?.name}`,
        name: t?.name,
        to: `/dashboard/${urlType}?type=${t?.id}`
      }
    })
  list.push({
    id: `navDivider${type}`,
    divider: true
  })

  return list
}
