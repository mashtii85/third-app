/**
 * Components - Users - Hooks - useDelete - Types.d
 */

// Types.d
import { UseHookProps } from '../../../../types/hook.d'
import { User } from '../../../../types/user'
import { UsersFilter } from '../../../accounts/types'

export interface UserDeleteVariables {
  userId: number
}

export interface UserDeleteData {
  users: { returning: { user: User }[] }
}

export interface useDeleteUserProps extends UseHookProps<UserDeleteData> {
  filters: UsersFilter
}
export interface useDeleteUserOutput {
  deleteUser: any
  loading: boolean
}
