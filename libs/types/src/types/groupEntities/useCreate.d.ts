/**
 * Components - GroupEntities - Hooks - UseCreate - Types.d
 */

// Types.d
import { ENTITIES } from '../../constants'
import { GroupEntity, STATUS_ACTIVE, UseHookOutput, UseHookProps } from '../general'
import { GroupEntityFilter } from './useGroupEntities'

export interface GroupEntityCreateData {
  groupEntities: { returning: GroupEntity[] }
}

export interface UseCreateGroupEntityProps extends UseHookProps<GroupEntityCreateData> {
  filters: Partial<GroupEntityFilter>
}

export interface UseCreateGroupEntityOutput extends UseHookOutput {
  createGroupEntity: any
}

export interface GroupEntityVariables {
  entity: ENTITIES
  entity_id: number
  group_id: number
  status: STATUS_ACTIVE
}
