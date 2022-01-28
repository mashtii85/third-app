/**
 * Components - Lessons - Questions - Lists - Table - Types
 */

// Constants
import { ENTITIES, MEDIUM_CATEGORY, STATUS_ACTIVE } from '@availabletowork/constants'

// Type
import { MEDIUM_TYPE } from '.'

export interface MediaTableProps {
  entity: ENTITIES
  entityId: number
  status: STATUS_ACTIVE
  type: MEDIUM_TYPE
  category?: MEDIUM_CATEGORY
  acceptTypes: string
  buttonCaption: string
}
