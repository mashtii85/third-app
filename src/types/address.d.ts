/**
 * Types - Address
 */

export enum ADDRESS_STATUS {
  Active = 'active',
  Inactive = 'inactive'
}

export interface Address {
  id: number
  entity: string
  entity_id: number
  name: string
  line1: string
  line2: string
  line3: string
  city: string
  postcode: string
  county: string
  created_at: string
  updated_at: string
  status: ADDRESS_STATUS
}
