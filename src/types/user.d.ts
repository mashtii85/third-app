/**
 * Types - User
 */
import { Account, ACCOUNT_TYPE } from './account.d'

export enum USER_STATUS {
  Active = 'active',
  Inactive = 'inactive',
  Banned = 'banned'
}

export interface AccountUsers {
  account_id: number
  id: number
  is_contact: boolean
  is_owner: boolean
  status: USER_STATUS
  user_id: number
  account: Account
}

export interface UserCustomFields {
  phone?: string
}

export interface User {
  id: number
  email: string
  is_verified: boolean
  name?: string
  name_first: string
  name_last: string
  custom_fields?: UserCustomFields
  status: USER_STATUS
  created_at?: string
  updated_at?: string
  accounts?: AccountUsers[]
  taxonomy_id?: number
}

export interface CurrentUser extends User {
  account?: AccountUsers
  account_id: number
  account_type: ACCOUNT_TYPE
  client_id: number
  password?: string
}
