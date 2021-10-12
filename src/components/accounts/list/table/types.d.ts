/**
 * Components - Accounts - List - Table - Types.d
 */

import { Account, ACCOUNT_TYPE } from '../../../../types/account.d'
import { User } from '../../../../types/user'
import { AccountFilters } from '../../types'
import { Options } from '../../../../types/taxonomy'

export interface AccountTableProps {
  filters?: Partial<AccountFilters>
}

export interface UserTableProps {
  accountId: number
  title: string
  type: ACCOUNT_TYPE
}

export interface UserAccount {
  account?: Account | any
  [key: string]: any
}
export interface AccountsRow
  extends Omit<Account, 'client_id' | 'structure' | 'taxonomy_id' | 'users' | 'taxonomy' | 'type'> {
  userId: number
  firstName: string
  lastName: string
  user?: string
  verified: boolean
  email?: string
  url?: string
  add_contact_user?: boolean
  client_id?: number
  actions: ''
  type?: ACCOUNT_TYPE
  taxonomy?: Options
  users?: User[]
}
