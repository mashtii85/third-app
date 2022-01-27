/**
 * Types - User
 */
import { ACCOUNT_TYPE, AccountUsers } from '../accounts'
import { Filter, STATUS_ACTIVE } from '../general'
import { Locale } from '../translations'

export enum USER_STATUS {
  Active = 'active',
  Inactive = 'inactive',
  Banned = 'banned'
}

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

export interface UsersFilter extends Filter {
  accountId: number
  status: STATUS_ACTIVE
  taxonomy: Options
}
