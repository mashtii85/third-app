/**
 * Components - Lessons - Questions - Lists - Table - Types
 */

// Type
import { ENTITIES } from '../../../../constants/entities'
import { MEDIUM_CATEGORY, MEDIUM_TYPE } from '../../../../types/medium'
import { STATUS_ACTIVE } from '../../../../types/select'

export interface MediaTableProps {
  entity: ENTITIES
  entityId: number
  status: STATUS_ACTIVE
  type: MEDIUM_TYPE
  category?: MEDIUM_CATEGORY
}
