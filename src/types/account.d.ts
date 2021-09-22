/**
 * Types - Account
 */

// import { Taxonomy } from './taxonomy'

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
  status: string
  type: string
  structure: string
  created_at: string
  taxonomy_id: number
  custom_fields: CustomField
}
