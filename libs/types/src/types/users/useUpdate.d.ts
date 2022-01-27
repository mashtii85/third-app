/**
 * Components - Users - Hooks - UseDelete - UseDeleteUser - Types.d
 */

// Types
import { User } from '.'
import { STATUS_ACTIVE, UseHookOutput } from '../general'

export interface UserUpdateVariables {
  userId: number
  set: {
    status: STATUS_ACTIVE
    description: string
  }
}

export interface UserUpdateData {
  user: User
}

export interface UseUpdateUserOutput extends UseHookOutput {
  updateUser: any
}
