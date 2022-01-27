/**
 * Components - Lessons - Lists - Ordering Helper
 */

// Hooks
import { useCustomUpdateLesson } from '../hooks/useCustomUpdate/useCustomUpdate'

// Constants
import { ENTITIES } from '@availabletowork/types'

// Types
import { Lesson } from '@availabletowork/types'

import { bulkUpdateQueryGenerator } from '../../common/ordering/bulkUpdateQueryGenerator'

// default ordering of input list must be {ordering: asc_nulls_last}
export const LessonOrderingHelper = (list?: Lesson[]): Lesson[] | undefined => {
  // setting ordering field
  const sortedList: Lesson[] | undefined = list?.map((item, index) => {
    return { ...item, ordering: index + 1 }
  })

  // preparing data for mutation
  const { variables, query } = bulkUpdateQueryGenerator<Lesson>(ENTITIES.Lesson, sortedList)
  let finalQuery = `mutation NeutralUpdate {
      update_lesson(where: {}, _set: {}) {
        returning {
          id
          ordering
        }
      }
    }`

  // mapping input list to ordering column
  const orderings = list?.map((item) => item.ordering)
  // finding null values
  const hasNull = orderings?.some((item) => !item)
  // finding duplicated values
  const hasDuplicate = orderings?.some((item, index) => {
    return orderings.indexOf(item) !== index
  })
  // if it has null or duplicated, try to update them with corret values
  if (hasNull || hasDuplicate) finalQuery = query
  const { updateLesson } = useCustomUpdateLesson(finalQuery, {
    onError: (error) => {
      console.error(error)
    }
  })

  // updating database
  updateLesson({ variables })

  return sortedList
}
