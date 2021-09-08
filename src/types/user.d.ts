/**
 * Types - User
 */
import { Account, ACCOUNT_TYPE } from './account'

export enum USER_STATUS {
  Active = 'active',
  Inactive = 'inactive',
  Banned = 'banned'
}

/* eslint-disable camelcase */
export interface AccountUsers {
  account_id: number
  id: number
  is_contact: boolean
  is_owner: boolean
  status: USER_STATUS
  user_id: number
  account: Account
}

/* eslint-disable camelcase */
export interface UserCustomFields {
  phone?: string
}

/* eslint-disable camelcase */
export interface User {
  id: number
  account_type?: ACCOUNT_TYPE
  email: string
  name_first: string
  name_last: string
  custom_fields?: UserCustomFields
  status: USER_STATUS
  created_at: string
  updated_at: string
  account_users?: AccountUsers[]
}
