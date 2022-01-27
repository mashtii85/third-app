/**
 * Components - Groups - Hooks - useCreate - Types
 */

// Types.d
import { UseHookOutput } from '../general'
import { Group } from './group'

export interface GroupCreateData {
  groups: { returning: Group[] }
}

export interface UseCreateGroupOutput extends UseHookOutput {
  createGroup: any
}
