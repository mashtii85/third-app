/**
 * Navigation - Data - Client
 */

// Types
import type { Navigation } from '../../../types/navigation'

import pages from '../../pages'

export const Client: Navigation = {
  right: [
    {
      id: 'navHomeMenu',
      name: 'Home',
      to: pages.dashboard.root
    },
    {
      id: 'navLocationsMenu',
      name: 'Locations',
      type: {
        as: 'dropdown',
        items: [
          {
            id: 'navLocationsList',
            name: 'List',
            to: pages.dashboard.locations.list
          }
        ]
      }
    },
    {
      id: 'navEventsMenu',
      name: 'Events',
      type: {
        as: 'dropdown',
        items: [
          {
            id: 'navEventsList',
            name: 'List',
            to: pages.dashboard.events.list
          }
        ]
      }
    },
    {
      id: 'navLearningMenu',
      name: 'Learning',
      type: {
        as: 'dropdown',
        items: [
          {
            id: 'navCourses',
            name: 'Courses',
            to: pages.dashboard.coursesClient.root
          },
          {
            id: 'navEnrollments',
            name: 'Enrollments',
            to: pages.dashboard.enrollments.root
          }
        ]
      }
    },
    {
      id: 'navMembersMenu',
      name: 'Members',
      type: {
        as: 'dropdown',
        items: [
          {
            id: 'navMembersList',
            name: 'List',
            to: pages.dashboard.accounts.list
          },
          {
            id: 'navMembersCreate',
            name: 'Create',
            to: pages.dashboard.accounts.create
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
