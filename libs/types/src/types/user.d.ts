/**
 * Types - User
 */
import { Account, ACCOUNT_TYPE } from './accounts/account'
import { Locale } from './translations/translations'

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
// export interface UserCustomFields{}

export interface NotificationSettingsType {
  alert: boolean
  email: boolean
  push: boolean
  sms: boolean
}
export interface UserMeta {
  locale?: Locale
  notifications: Partial<NotificationSettingsType>
}
export interface User {
  id: number
  email: string
  email_verified: boolean
  name?: string
  name_first: string
  name_last: string
  phone: string
  custom_fields?: LooseObject
  status: USER_STATUS
  created_at?: string
  updated_at?: string
  accounts?: AccountUsers[]
  taxonomy_id?: number
  meta?: Partial<UserMeta>
}

export interface CurrentUser extends User {
  account?: AccountUsers
  account_id: number
  account_type: ACCOUNT_TYPE
  client_id: number
  password?: string
}
