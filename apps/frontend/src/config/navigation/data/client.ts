/**
 * Navigation - Data - Client
 */

// Helpers
import { prepareTaxonomyNavigation } from './helpers'

// Constants
import { LOCALE_NS, pages, TAXONOMY_TYPE } from '@availabletowork/constants'

// Types
import { Account, LooseObject, Navigation, Taxonomy } from '@availabletowork/types'

// I18n
import useTranslation from '../../../translations/hooks/useTranslation'

export const Client = ({
  account,
  taxonomies
}: {
  account: Account | undefined
  taxonomies?: Taxonomy[]
}): Partial<Navigation> => {
  const memberTypes = prepareTaxonomyNavigation(taxonomies, TAXONOMY_TYPE.Member)
  const { t } = useTranslation(LOCALE_NS.Navbar)

  const menu: LooseObject[] = [
    {
      id: 'navMembersMenu',
      name: t('Members'),
      type: {
        as: 'dropdown',
        items: [
          ...(memberTypes.length > 1 ? memberTypes : []),
          {
            id: 'navMembersList',
            name: t('AllMembers'),
            to: pages.dashboard.accounts.list
          }
        ]
      }
    }
  ]
  if (account && account.meta) {
    const { locations, events, learning } = account.meta.features

    if (locations) {
      const locationTypes = prepareTaxonomyNavigation(taxonomies, TAXONOMY_TYPE.Location)

      menu.push({
        id: 'navLocationsMenu',
        name: t('Locations'),
        type: {
          as: 'dropdown',
          items: [
            ...(locationTypes.length > 1 ? locationTypes : []),
            {
              id: 'navLocationsList',
              name: t('AllLocations'),
              to: pages.dashboard.locations.list
            }
          ]
        }
      })
    }
    if (events) {
      const eventTypes = prepareTaxonomyNavigation(taxonomies, TAXONOMY_TYPE.Event)
      menu.push({
        id: 'navEventsMenu',
        name: t('Events'),
        type: {
          as: 'dropdown',
          items: [
            ...(eventTypes.length > 1 ? eventTypes : []),
            {
              id: 'navEventsList',
              name: t('AllEvents'),
              to: pages.dashboard.events.list
            }
          ]
        }
      })
    }
    if (learning) {
      const courseTypes = prepareTaxonomyNavigation(taxonomies, TAXONOMY_TYPE.Course)
      menu.push({
        id: 'navLearningMenu',
        name: t('Learning'),
        type: {
          as: 'dropdown',
          items: [
            ...(courseTypes.length > 1 ? courseTypes : []),
            {
              id: 'navCourses',
              name: t('AllCourses'),
              to: pages.dashboard.coursesClient.root
            },
            {
              id: 'navEnrollmentsDivider',
              divider: true
            },
            {
              id: 'navEnrollments',
              name: t('Enrollments'),
              to: pages.dashboard.enrollments.root
            }
          ]
        }
      })
    }
  }
  return {
    right: [
      {
        id: 'navHomeMenu',
        name: t('Home'),
        to: pages.dashboard.root
      },
      ...menu,
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
              name: t('Settings'),
              to: pages.dashboard.account.settings
            },
            {
              id: 'navAccount',
              name: t('Account'),
              to: pages.dashboard.account.view
            },
            {
              id: 'navCategories',
              name: t('Categories'),
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
