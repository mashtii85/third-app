/**
 * Navigation - Data - UserDropdown
 */

// Types
import { User } from '../../../types/user'

export const UserDropdown = (user: User) => {
  const prepareNavItems = () => {
    const items = [
      {
        id: 'navProfile',
        name: 'Profile',
        to: `/dashboard/users/view?id=${user.id}`
      },
      {
        id: 'navLogoutDivider',
        divider: true
      },
      {
        id: 'navLogout',
        name: 'Logout',
        to: '/account/logout'
      }
    ]

    return items
  }
  return {
    id: 'navUserDropdown',
    name: user.nameFirst,
    position: 'right',
    type: {
      as: 'dropdown',
      items: prepareNavItems()
    }
  }
}
