/**
 * Types - EntityGroup
 */

// Types
import { ENTITIES } from '../../constants'
import { Group } from './group'
import { STATUS_ACTIVE } from './select.d'

export interface GroupEntity {
  id: number
  entity?: ENTITIES
  entity_id?: number
  status: STATUS_ACTIVE
  group: Group
}
