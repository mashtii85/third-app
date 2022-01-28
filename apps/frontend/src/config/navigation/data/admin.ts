/**
 * Navigation - Data - Admin
 */

// Constants
import { pages, TAXONOMY_TYPE } from '@availabletowork/constants'

// Types
import { Navigation, Taxonomy } from '@availabletowork/types'

// Helpers
import { prepareTaxonomyNavigation } from './helpers'

export const Admin = (taxonomies?: Taxonomy[]): Navigation => {
  const clientTypes = prepareTaxonomyNavigation(taxonomies, TAXONOMY_TYPE.Client)

  return {
    left: [],
    right: [
      {
        id: 'navHomeMenu',
        name: 'Home',
        to: pages.dashboard.root
      },
      {
        id: 'navClientsMenu',
        name: 'Clients',
        type: {
          as: 'dropdown',
          items: [
            ...(clientTypes.length > 1 ? clientTypes : []),
            {
              id: 'navClientsList',
              name: 'List',
              to: pages.dashboard.accounts.list
            }
          ]
        }
      },
      {
        id: 'navAccount',
        icon: 'cog',
        name: '',
        prefix: 'fas',
        type: {
          as: 'dropdown',
          items: [
            {
              id: 'navSettings',
              name: 'Settings',
              to: pages.dashboard.account.settings
            },
            {
              id: 'navAccount',
              name: 'Account',
              to: pages.dashboard.account.view
            },
            {
              id: 'navCategories',
              name: 'Categories',
              to: pages.dashboard.categories.view
            },
            {
              id: 'navPlayground',
              name: 'Playground',
              to: pages.dashboard.playground
            }
          ]
        }
      },
      {
        id: 'navUserDropdown'
      }
    ]
  }
}
