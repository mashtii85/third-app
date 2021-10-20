/**
 * Components - Accounts - Lists - UserAccounts - Table
 */

import { User } from '../../../../../types/user'

export interface UserRow
  extends Omit<User, 'id' | 'is_verified' | 'name' | 'updated_at' | 'accounts'> {
  id?: number
  actions: ''
}
