/**
 * Navigation - Data - User
 */

import pages from '../../pages.json'

export const User: any = {
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
            id: 'navCoursesActive',
            name: 'Active Courses',
            to: pages.dashboard.coursesAccount.started
          },
          {
            id: 'navCoursesCompleted',
            name: 'Completed Courses',
            to: pages.dashboard.coursesAccount.completed
          },
          {
            id: 'navCoursesAll',
            name: 'All Courses',
            to: pages.dashboard.coursesAccount.all
          }
        ]
      }
    },
    {
      id: 'navUserDropdown'
    }
  ]
}
