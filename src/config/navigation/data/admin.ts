/**
 * Navigation - Data - Admin
 */

// Types
import { Navigation } from '../../../types/navigation'

import path from '../admin.json'

export const Admin: Navigation = {

  right: [
    {
      id: 'navHomeMenu',
      name: 'Home',
      to: path.dashboard.root
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
            to: path.dashboard.courses.root
          },
          {
            id: 'navCoursesCreate',
            name: 'Create',
            to: path.dashboard.courses.manage
          }
        ]
      }
    },
    {
      id: 'account',
      name: 'Account',
      to: path.dashboard.admin.view
    },
    {
      id: 'navUserDropdown'
    }
  ]
}
