/**
 * Components - Courses - List - Table - Hooks - UseCreate - helpers
 */

// Types
import { UseHookOutput, UseHookProps } from '../../../../types/hook.d'
import { User, USER_STATUS } from '../../../../types/user'
import { UsersFilter } from '../../../accounts/types'

export interface CreateUserVariables {
  user: User
}

export interface UseCreateUserProps extends UseHookProps<CreateUserVariables> {
  filters?: Partial<UsersFilter>
}

export interface UseCreateUserOutput extends UseHookOutput {
  createUser: any
}

export interface UserQueryData {
  users: User[]
}

export interface CreateUserModel
  extends Omit<User, 'id' | 'name' | 'created_at' | 'updated_at' | 'accounts'> {
  accounts: { data: { account_id: number; status: USER_STATUS } }
}
