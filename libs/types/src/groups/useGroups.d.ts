/**
 * Components - Groups - Hooks - types
 */

// Constants
import { ENTITIES, STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Group } from './group'

export interface GroupFilter {
  accountId: number
  taxonomyId: number
  entityId: number
  entity: ENTITIES
  name: string
  description: string
  status: STATUS_ACTIVE
}

export interface GroupDataList {
  groups: Group[]
}
