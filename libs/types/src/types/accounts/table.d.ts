/**
 * Components - Accounts - Lists - Accounts - Table - Types.d
 */

import { Options } from 'graphql/utilities/extendSchema'
import { STATUS_ACTIVE } from '../general/select.d'
import { Account, CustomField } from './account'
import { AccountFilters, UsersFilter } from './types.d'

export interface AccountTableProps {
  filters?: Partial<AccountFilters>
}

export interface UserTableProps {
  filters: UsersFilter
}

export interface UserAccount {
  account?: Account | any
  [key: string]: any
}
export interface AccountsRow {
  id?: number
  userId?: number
  name?: string
  status?: STATUS_ACTIVE
  created_at?: string
  custom_fields?: CustomField
  firstName?: string
  lastName?: string
  password?: string
  user?: string
  verified?: boolean
  email?: string
  url?: string
  add_contact_user?: boolean
  client_id?: number
  actions?: string
  type?: ACCOUNT_TYPE
  memberType?: string
  taxonomy?: Options
  users?: User[]
  meta?: any
  clientModules?: string[]
}
