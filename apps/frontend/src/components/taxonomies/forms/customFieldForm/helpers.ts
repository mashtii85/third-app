/**
 * Components - Taxonomy - Forms - CustomFieldForm - Helpers
 */

// Constants
import { ENTITIES } from '@availabletowork/constants'

export const customFieldEntityOptions = [
  {
    text: 'Members',
    value: ENTITIES.Account
  },
  {
    text: 'Locations',
    value: ENTITIES.Location
  },
  {
    text: 'Courses',
    value: ENTITIES.Course
  },
  {
    text: 'Events',
    value: ENTITIES.Event
  }
]
