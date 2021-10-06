/**
 * Components - Accounts - List - Table - Types.d
 */

import { Account, ACCOUNT_TYPE } from '../../../../types/account.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { AccountFilters } from '../../types'

export interface AccountTableProps {
  filters?: Partial<AccountFilters>
  title: string
  type?: ACCOUNT_TYPE
  accountId?: number
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

export interface AccountsRow {
  id: number
  userId: number
  name?: string
  firstName: string
  lastName: string
  user?: string
  verified: boolean
  email?: string
  url?: string
  status: STATUS_ACTIVE
  created: string
  actions: ''
  taxonomy: any
  custom_fields: any
}
