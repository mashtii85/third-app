/**
 * Components - Taxonomy - Forms - CustomFieldForm - Helpers
 */
import { ENTITIES } from '@availabletowork/types'

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
