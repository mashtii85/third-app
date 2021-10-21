/**
 * Components - Users - Hooks - UseDelete - UseDeleteUser - Types.d
 */

// Types.d
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { UseHookOutput } from '../../../../types/hook.d'
import { User } from '../../../../types/user'

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
