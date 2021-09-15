/**
 * Types - User
 */
import { Account, ACCOUNT_TYPE } from './account'

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
  client_id?: number
  account_id?: number
  account_type?: ACCOUNT_TYPE
  email: string
  name?: string
  name_first: string
  name_last: string
  custom_fields?: UserCustomFields
  status: USER_STATUS
  created_at: string
  updated_at: string
  account_users?: AccountUsers[]
}
