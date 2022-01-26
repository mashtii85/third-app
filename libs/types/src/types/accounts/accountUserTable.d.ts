/**
 * Components - Accounts - Lists - UserAccounts - Table
 */

import { User } from './user'

export interface UserRow
  extends Omit<User, 'id' | 'email_verified' | 'name' | 'updated_at' | 'accounts'> {
  id?: number
  password?: string
  actions: ''
}
