/**
 * Components - Lessons - Questions - Lists - Table - Types
 */

// Type
import { MEDIUM_CATEGORY, MEDIUM_TYPE } from '.'
import { ENTITIES } from '../../constants'
import { STATUS_ACTIVE } from '../general'

export interface MediaTableProps {
  entity: ENTITIES
  entityId: number
  status: STATUS_ACTIVE
  type: MEDIUM_TYPE
  category?: MEDIUM_CATEGORY
  acceptTypes: string
  buttonCaption: string
}
