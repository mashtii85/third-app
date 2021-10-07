/**
 * Navigation - Data - Admin
 */

// Types
import type { Navigation } from '../../../types/navigation'

import pages from '../../pages'

export const Admin: Navigation = {
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
          {
            id: 'navClientsList',
            name: 'List',
            to: pages.dashboard.accounts.list
          },
          {
            id: 'navMembersCreate',
            name: 'Create',
            to: pages.dashboard.accounts.create
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
