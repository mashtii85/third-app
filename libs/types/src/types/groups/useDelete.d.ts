/**
 * Components - Groups - Hooks - useDelete - Types
 */

// Types
import { Group, GroupFilter } from '.'
import { UseHookOutput, UseHookProps } from '..'

export interface GroupDeleteVariables {
  id: number
}

export interface GroupDeleteData {
  group: Group
}

export interface useDeleteGroupProps extends UseHookProps<GroupDeleteData> {
  filters: GroupFilter
  id: number
}

export interface UseDeleteGroupOutput extends UseHookOutput {
  deleteGroup: any
}

export interface GroupDeleteType {
  id: number
  accountId?: number
  taxonomyId?: number
  name: string
}
