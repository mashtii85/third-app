/**
 * Components - GroupEntities - Hooks - UseDelete - Types.d
 */

// Types
import { GroupEntity } from '../../../../types/groupEntity'

import { UseHookOutput, UseHookProps } from '../../../../types/hook'
import { GroupEntityFilter } from './hooks/useGroupEntities/useGroupEntities'

export interface GroupDeleteVariables {
  id: number
}

export interface GroupEntityDeleteData {
  groupEntity: GroupEntity
}

export interface useDeleteGroupEntityProps extends UseHookProps<GroupEntityDeleteData> {
  filters: Partial<GroupEntityFilter>
}

export interface UseDeleteGroupEntityOutput extends UseHookOutput {
  deleteGroupEntity: any
}

export interface GroupEntityDeleteType {
  id: number
  filters: Partial<GroupEntityFilter>
  groupName: string
  onSuccess: () => void
}
