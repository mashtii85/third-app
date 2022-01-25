/**
 * Components - Groups - Hooks - useCreate - Types
 */

// Types.d
import { Group } from '../../../../types/group.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { UseHookOutput } from '../../../../types/hook.d'

export interface GroupCreateType {
  accoutId: number
  name: string
  description: string
  status: STATUS_ACTIVE
}

export interface GroupCreateData {
  groups: { returning: Group[] }
}

export interface UseCreateGroupOutput extends UseHookOutput {
  createGroup: any
}
