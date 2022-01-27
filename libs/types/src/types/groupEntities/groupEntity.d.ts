/**
 * Types - EntityGroup
 */

// Types
import { ENTITIES } from '../../constants'
import { STATUS_ACTIVE } from '../general'
import { Group } from '../groups'

export interface GroupEntity {
  id: number
  entity?: ENTITIES
  entity_id?: number
  status: STATUS_ACTIVE
  group: Group
}
