/**
 * Components - Lessons - Questions - Lists - Table - Types
 */

// Type
import { MEDIUM_CATEGORY, MEDIUM_TYPE } from '../../../../types/medium'
import { STATUS_ACTIVE } from '../../../../types/select'

export interface MediaTableProps {
  entity: string
  entityId: number
  status: STATUS_ACTIVE
  type: MEDIUM_TYPE
  category?: MEDIUM_CATEGORY
}
