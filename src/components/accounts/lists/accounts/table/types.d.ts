/**
 * Components - Accounts - Lists - Accounts - Table - Types.d
 */

import { Account, ACCOUNT_TYPE, CustomField } from '../../../../../types/account'
import { User } from '../../../../../types/user'
import { AccountFilters, UsersFilter } from '../../../types'
import { STATUS_ACTIVE } from '../../../../../types/select'
import { Options } from '../../../../../types/options'

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
  actions?: ''
  type?: ACCOUNT_TYPE
  memberType?: string
  taxonomy?: Options
  users?: User[]
}
