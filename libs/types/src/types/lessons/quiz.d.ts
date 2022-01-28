/**
 * Components - Courses - Resources - List - Table - Types
 */

// Constants
import { ENTITIES, STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { TAXONOMY_TYPE } from '@availabletowork/constants'

export interface QuestionsListToolbarType {
  entity: ENTITIES
  entityId: number
  type: TAXONOMY_TYPE
  status: STATUS_ACTIVE
}
