/**
 * Navigation - Data - Client
 */

// Types
import type { Navigation } from '../../../types/navigation'

import pages from '../../pages.json'

export const Client: Navigation = {
  right: [
    {
      id: 'navHomeMenu',
      name: 'Home',
      to: pages.dashboard.root
    },
    {
      id: 'navAccountMenu',
      name: 'Accounts',
      type: {
        as: 'dropdown',
        items: [
          {
            id: 'navAccounts',
            name: 'List',
            to: pages.dashboard.accounts.list
          },
          {
            id: 'navAccountsCreate',
            name: 'Create',
            to: pages.dashboard.accounts.create
          }
        ]
      }
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
      id: 'navEnrollmentsMenu',
      name: 'Enrollments',
      type: {
        as: 'dropdown',
        items: [
          {
            id: 'navEnrollments',
            name: 'List',
            to: pages.dashboard.enrollments.root
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
            id: 'navUsers',
            name: 'Users',
            to: pages.dashboard.account.users
          },
          {
            id: 'navCategories',
            name: 'Categories',
            to: pages.dashboard.categories.view
          }
        ]
      }
    },
    {
      id: 'navUserDropdown'
    }
  ]
}
