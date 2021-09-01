/**
 * Types - User
 */

export enum ACCOUNT_TYPE {
  Admin = 'admin',
  User = 'user'
}

/* eslint-disable camelcase */
export interface User {
  id: number
  account_type: ACCOUNT_TYPE
  email: string
  name_first: string
  name_last: string
  phone: string
  status: string
  created_at: string
  updated_at: string
}
