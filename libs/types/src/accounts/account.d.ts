/**
 * Types - Account
 */

import { ACCOUNT_TYPE, STATUS_ACTIVE } from '@availabletowork/constants'
import { Filter, Options, Taxonomy } from '../general'
import { User } from './user'

export interface Account_CustomField {
  position: string
}

export interface Account {
  id: number
  client_id?: number
  name: string
  status: STATUS_ACTIVE
  type: ACCOUNT_TYPE
  structure: string
  created_at: string
  updated_at: string
  taxonomy_id: number
  custom_fields: Account_CustomField
  meta: any
  users: { user: User }[]
  taxonomy: Taxonomy | undefined
}

export interface AccountFilters extends Filter {
  accountId: number
  clientId: number
  accountType: ACCOUNT_TYPE
  userType: ACCOUNT_TYPE
  userId: number
  taxonomy: Options
  status: STATUS_ACTIVE
}
