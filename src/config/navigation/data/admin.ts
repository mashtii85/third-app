/**
 * Navigation - Data - Admin
 */

// Types
import { Navigation } from '../../../types/navigation'

export const Admin: Navigation = {
  right: [
    {
      id: 'navHomeMenu',
      name: 'Home',
      to: '/dashboard'
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
            to: '/dashboard/courses'
          },
          {
            id: 'navCoursesCreate',
            name: 'Create',
            to: '/dashboard/courses/manage'
          }
        ]
      }
    },
    {
      id: 'account',
      name: 'Account',
      to: '/dashboard/admin/view'
    },
    {
      id: 'navUserDropdown'
    }
  ]
}
