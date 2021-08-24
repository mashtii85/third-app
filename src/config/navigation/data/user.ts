/**
 * Navigation - Data - User
 */

 export const User: any = {
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
            id: 'navCoursesActive',
            name: 'Active Courses',
            to: '/dashboard/courses?show=started'
          },
          {
            id: 'navCoursesCompleted',
            name: 'Completed Courses',
            to: '/dashboard/courses?show=completed'
          },
          {
            id: 'navCoursesAll',
            name: 'All Courses',
            to: '/dashboard/courses?show=all'
          }
        ]
      }
    },
    {
      id: 'navUserDropdown'
    }
  ]
}
