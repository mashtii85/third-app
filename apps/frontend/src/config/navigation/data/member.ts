/**
 * Navigation - Data - Member
 */

import { pages } from '@availabletowork/types'

export const Member: any = {
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
            id: 'navEnrolledCourse',
            name: 'Enrolled courses',
            to: pages.dashboard.coursesAccount.enrolled
          },
          {
            id: 'navCourseCatalog',
            name: 'Course catalog',
            to: pages.dashboard.coursesAccount.catalog
          }
        ]
      }
    },
    {
      id: 'navUserDropdown'
    }
  ]
}
