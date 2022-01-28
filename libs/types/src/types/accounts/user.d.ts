/**
 * Types - User
 */

//Constants
import { USER_STATUS } from '@availabletowork/constants'

// Types
import { Account } from './account'

export interface AccountUsers {
  account_id: number
  id: number
  is_contact: boolean
  is_owner: boolean
  status: USER_STATUS
  user_id: number
  account: Account
}
