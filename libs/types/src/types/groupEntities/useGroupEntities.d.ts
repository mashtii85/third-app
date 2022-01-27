/**
 * Components - GroupEntity - Hooks - useGroupEntities - Types.d
 */

// Types
import { ENTITIES } from '../../constants'
import { Filter, GroupEntity, STATUS_ACTIVE, UseHookOutput } from '../general'
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
