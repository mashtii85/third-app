/**
 * Components - Users - Hooks - UseDelete - UseDeleteUser - Types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { User } from '.'
import { UseHookOutput } from '../general'

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
