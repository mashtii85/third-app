/**
 * Navigation - Data - User
 */

import path from '../user.json'

export const User: any = {
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
            id: 'navCoursesActive',
            name: 'Active Courses',
            to: path.dashboard.courses.started
          },
          {
            id: 'navCoursesCompleted',
            name: 'Completed Courses',
            to: path.dashboard.courses.completed
          },
          {
            id: 'navCoursesAll',
            name: 'All Courses',
            to: path.dashboard.courses.all
          }
        ]
      }
    },
    {
      id: 'navUserDropdown'
    }
  ]
}
