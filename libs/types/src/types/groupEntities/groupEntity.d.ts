/**
 * Types - EntityGroup
 */

// Constants
import { ENTITIES, STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Group } from '../groups'

export interface GroupEntity {
  id: number
  entity?: ENTITIES
  entity_id?: number
  status: STATUS_ACTIVE
  group: Group
}
