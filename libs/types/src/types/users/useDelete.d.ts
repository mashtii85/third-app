/**
 * Components - Users - Hooks - useDelete - Types.d
 */

// Types.d
import { User, UsersFilter } from '.'
import { UseHookProps, UseHookOutput } from '../general'

export interface UserDeleteVariables {
  userId: number
}

export interface UserDeleteData {
  users: { returning: { user: User }[] }
}

export interface useDeleteUserProps extends UseHookProps<UserDeleteData> {
  filters: UsersFilter
}
export interface useDeleteUserOutput extends UseHookOutput {
  deleteUser: any
}
