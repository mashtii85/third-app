/**
 * Navigation - Data - Client
 */

// Types
import type { Navigation } from '../../../types/navigation'
import { Taxonomy, TAXONOMY_TYPE } from '../../../types/taxonomy.d'

// Helpers
import { prepareTaxonomyNavigation } from './helpers'

import pages from '../../pages'

export const Client = (taxonomies: Partial<Taxonomy[]>): Navigation => {
  const locationTypes = prepareTaxonomyNavigation(taxonomies, TAXONOMY_TYPE.Location)
  const courseTypes = prepareTaxonomyNavigation(taxonomies, TAXONOMY_TYPE.Course)
  const eventTypes = prepareTaxonomyNavigation(taxonomies, TAXONOMY_TYPE.Event)
  const memberTypes = prepareTaxonomyNavigation(taxonomies, TAXONOMY_TYPE.Member)

  return {
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
            ...(locationTypes.length > 1 ? locationTypes : []),
            {
              id: 'navLocationsList',
              name: 'All Locations',
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
            ...(eventTypes.length > 1 ? eventTypes : []),
            {
              id: 'navEventsList',
              name: 'All Events',
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
            ...(courseTypes.length > 1 ? courseTypes : []),
            {
              id: 'navCourses',
              name: 'All Courses',
              to: pages.dashboard.coursesClient.root
            },
            {
              id: 'navEnrollmentsDivider',
              divider: true
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
            ...(memberTypes.length > 1 ? memberTypes : []),
            {
              id: 'navMembersList',
              name: 'All Members',
              to: pages.dashboard.accounts.list
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
}
