/**
 * Types - Account
 */

export enum ACCOUNT_TYPE {
  Admin = 'admin',
  Client = 'client',
  Account = 'account'
}

/* eslint-disable camelcase */
export interface Account {
  id: number
  name: string
  status: string
  type: string
  structure: string
  created_at: string
}
