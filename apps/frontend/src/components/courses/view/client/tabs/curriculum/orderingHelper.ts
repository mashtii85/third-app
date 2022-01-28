/**
 * Components - Course - View - Client - Tabs - Curriculum - Ordering Helper
 */

// Hooks
import { useCustomUpdateModule } from '../../../../../module/hooks/useCustomUpdate/useCustomUpdate'

// Constants
import { ENTITIES } from '@availabletowork/constants'

// Types
import { Module } from '@availabletowork/types'
import { bulkUpdateQueryGenerator } from '../../../../../common/ordering/bulkUpdateQueryGenerator'

// default ordering of input list must be {ordering: asc_nulls_last}
export const CourseModuleOrderingHelper = (list?: Module[]): Module[] | undefined => {
  // setting ordering field
  const sortedList: Module[] | undefined = list?.map((item, index) => {
    return { ...item, ordering: index + 1 }
  })

  // preparing data for mutation
  const { variables, query } = bulkUpdateQueryGenerator<Module>(ENTITIES.Module, sortedList)
  let finalQuery = `mutation NeutralUpdate {
      update_module(where: {}, _set: {}) {
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
  if (hasNull || hasDuplicate) finalQuery = query
  const { updateModule } = useCustomUpdateModule(finalQuery, {
    onError: (error) => {
      console.error(error)
    }
  })

  // updating database
  updateModule({ variables })

  return sortedList
}
