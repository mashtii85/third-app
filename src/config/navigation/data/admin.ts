/**
 * Navigation - Data - Admin
 */

// Types
import type { Navigation } from '../../../types/navigation.d'

import pages from '../../pages.json'

export const Admin: Navigation = {
  right: [
    {
      id: 'navHomeMenu',
      name: 'Home',
      to: pages.dashboard.root
    },
    {
      id: 'navCoursesMenu',
      name: 'Courses',
      type: {
        as: 'dropdown',
        items: [
          {
            id: 'navCourses',
            name: 'List',
            to: pages.dashboard.coursesClient.root
          },
          {
            id: 'navCoursesCreate',
            name: 'Create',
            to: pages.dashboard.coursesClient.manage
          }
        ]
      }
    },
    {
      id: 'account',
      name: 'Account',
      to: pages.dashboard.account.view
    },
    {
      id: 'navUserDropdown'
    }
  ]
}
