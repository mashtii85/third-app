/**
 * Components - AccountUsers - Hooks - UseUserAccounts - UseUserAccounts
 */

import { UseHookOutput } from '../../../../types/hook'
import { User } from '../../../../types/user'

export interface UseUserOutput extends UseHookOutput {
  user: Partial<User>
}

export interface UserData {
  user?: User
}

export interface UserVariables {
  userId: number
}
