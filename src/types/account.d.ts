/**
 * Types - Account
 */

export enum ACCOUNT_TYPE {
  Admin = 'admin',
  Client = 'client',
  Account = 'account'
}

export interface Account {
  id: number
  name: string
  status: string
  type: string
  structure: string
  created_at: string
}
