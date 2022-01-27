/**
 * Components - Groups - Hooks - useUpdate - Types
 */

// Types
import { STATUS_ACTIVE, UseHookOutput } from '../general'
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
