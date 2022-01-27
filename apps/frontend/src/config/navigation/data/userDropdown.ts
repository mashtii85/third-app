/**
 * Navigation - Data - UserDropdown
 */

// Types
import { User } from '@availabletowork/types'
import { NavItem, UserDropDownOutput } from '@availabletowork/types'

import { pages } from '@availabletowork/types'

export const UserDropdown = (user: User): UserDropDownOutput => {
  const prepareNavItems = (): NavItem[] => [
    {
      id: 'navProfile',
      name: 'Profile',
      to: pages.dashboard.profile
    },
    {
      id: 'navLogoutDivider',
      divider: true
    },
    {
      id: 'navLogout',
      name: 'Logout',
      to: pages.account.logout
    }
  ]

  return {
    id: 'navUserDropdown',
    name: user.name_first,
    position: 'right',
    type: {
      as: 'dropdown',
      items: prepareNavItems()
    }
  }
}
