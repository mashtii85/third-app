/**
 * Components - AccountUsers - Hooks - UseUserAccounts - UseUserAccounts
 */

import { UseHookOutput } from '../../../../types/hook'
import { LooseObject } from '../../../../types/object'
import { User } from '../../../../types/user'

export interface UseUserOutput extends UseHookOutput {
  user: User | LooseObject
}

export interface UserData {
  user?: User
}

export interface UserVariables {
  userId: number
}
