/**
 * Components - Courses - Resources - List - Table - Types
 */

// Constants
import { ENTITIES } from '../../constants'

// Types
import { STATUS_ACTIVE } from '../general'
import { TAXONOMY_TYPE } from '../taxonomies'

export interface QuestionsListToolbarType {
  entity: ENTITIES
  entityId: number
  type: TAXONOMY_TYPE
  status: STATUS_ACTIVE
}
