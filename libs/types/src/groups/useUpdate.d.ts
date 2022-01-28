/**
 * Components - Groups - Hooks - useUpdate - Types
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { UseHookOutput } from '../general'
import { Group } from './group'

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
