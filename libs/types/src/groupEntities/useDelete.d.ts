/**
 * Components - GroupEntities - Hooks - UseDelete - Types.d
 */

// Types
import { GroupEntity, UseHookOutput, UseHookProps } from '../general'
import { GroupEntityFilter } from './useGroupEntities'

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
