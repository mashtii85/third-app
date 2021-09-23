/**
 * Types - Account
 */

import { STATUS_ACTIVE } from './select'
import { User } from './user'

export enum ACCOUNT_TYPE {
  Admin = 'admin',
  Client = 'client',
  Member = 'member'
}

export interface CustomField {
  position: string
}

export interface Account {
  id: number
  name: string
  status: STATUS_ACTIVE
  type: string
  structure: string
  created_at: string
  taxonomy_id: number
  custom_fields: CustomField
  users: { user: User }[]
}
