/**
 * Components - Courses - Resources - List - Table - Types
 */

// Constants
import { ENTITIES } from '../../constants/entities'

// Types
import { STATUS_ACTIVE } from '../../../../../types/select.d'
import { TAXONOMY_TYPE } from '../../../../../types/taxonomy.d'

export interface QuestionsListToolbarType {
  entity: ENTITIES
  entityId: number
  type: TAXONOMY_TYPE
  status: STATUS_ACTIVE
}
