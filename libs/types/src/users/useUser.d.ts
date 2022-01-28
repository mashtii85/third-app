/**
 * Components - AccountUsers - Hooks - UseUserAccounts - UseUserAccounts
 */

import { User } from '.'
import { UseHookOutput } from '../general'

export interface UseUserOutput extends UseHookOutput {
  user: Partial<User>
}

export interface UserDatum {
  user?: User
}

export interface UserVariables {
  userId: number
}
