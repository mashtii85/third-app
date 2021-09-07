/**
 * Types - User
 */
import { Account } from './Account'

export enum ACCOUNT_TYPE {
  Admin = 'admin',
  Client = 'client',
  Account = 'account'
}

/* eslint-disable camelcase */
export interface AccountUsers {
  account_id: number
  id: number
  is_contact: boolean
  is_owner: boolean
  status: string
  user_id: number
  account: Account
  // [key: string]: any
}

/* eslint-disable camelcase */
export interface User {
  id: number
  name: string
  account_type: ACCOUNT_TYPE
  email: string
  name_first: string
  name_last: string
  phone: string
  status: string
  created_at: string
  updated_at: string
  account_users: AccountUsers[]
}
