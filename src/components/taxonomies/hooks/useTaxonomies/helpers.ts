/**
 * Components - Taxonomies - Hooks - useTaxonomies - Helpers
 */

import { Taxonomy } from '../../../../types/taxonomy'

export const prepareTaxonomies = (list: Taxonomy[] = []): Taxonomy[] => {
  const taxonomies = list.map((taxonomy) => {
    if (taxonomy.name === 'selectentity') {
      return {
        ...taxonomy,
        custom_fields: {
          ...taxonomy.custom_fields,
          options: [
            {
              label: 'Members',
              value: 'members'
            },
            {
              label: 'Locations',
              value: 'locations'
            },
            {
              label: 'Courses',
              value: 'courses'
            },
            {
              label: 'Events',
              value: 'events'
            }
          ]
        }
      }
    } else return taxonomy
  })

  return taxonomies ?? []
}
