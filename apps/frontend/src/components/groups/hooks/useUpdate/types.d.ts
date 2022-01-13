/**
 * Components - Groups - Hooks - useUpdate - Types
 */

// Types
import { Group } from '../../../../types/group.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { UseHookOutput } from '../../../../types/hook.d'

export interface GroupUpdateVariables {
  id: number
  changes: {
    name: string
    description: string
    status: STATUS_ACTIVE
  }
}

export interface GroupUpdateData {
  group: Group
}

export interface UseUpdateGroupOutput extends UseHookOutput {
  updateGroup: any
}
