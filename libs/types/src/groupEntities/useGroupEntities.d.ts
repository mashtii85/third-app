/**
 * Components - GroupEntity - Hooks - useGroupEntities - Types.d
 */

// Constants
import { ENTITIES, STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Filter, GroupEntity, UseHookOutput } from '../general'
export interface GroupEntityFilter extends Filter {
  entityId: number
  entity: ENTITIES
  status: STATUS_ACTIVE
}

export interface GroupEntityDataList {
  groupEntities: GroupEntity[]
}

export interface UseGroupEntityOutput extends UseHookOutput {
  groupEntities: GroupEntity[]
}
