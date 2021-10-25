/**
 * Components - GroupEntity - Hooks - useGroupEntities - Types.d
 */

// Types
import { ENTITIES } from '../../../../constants/entities.d'
import { Filter } from '../../../../types/filter'
import { GroupEntity } from '../../../../types/groupEntity'
import { UseHookOutput } from '../../../../types/hook'
import { STATUS_ACTIVE } from '../../../../types/select.d'

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
