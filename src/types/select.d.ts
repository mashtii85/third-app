/**
 * Types - Select
 */

export enum STATUS_ACTIVE {
  Active = 'active',
  Inactive = 'inactive'
}

export interface SELECT_STATUS_ACTIVE {
  text: 'Active' | 'Inactive'
  value: 'active' | 'inactive'
}

export interface SELECT {
  label: string
  value: string
}
