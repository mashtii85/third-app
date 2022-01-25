/**
 * Components - GroupEntities - Hooks - UseCreate - Types.d
 */

// Types.d
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { UseHookOutput, UseHookProps } from '../../../../types/hook'
import { GroupEntity } from '../../../../types/groupEntity'
import { ENTITIES } from '../../constants/entities'
import { GroupEntityFilter } from './hooks/useGroupEntities/useGroupEntities'

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
