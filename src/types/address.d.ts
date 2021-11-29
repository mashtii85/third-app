/**
 * Types - Address
 */

// Constants
import { ENTITIES } from '../constants/entities'

export enum ADDRESS_STATUS {
  Active = 'active',
  Inactive = 'inactive'
}

export enum ADDRESS_TYPE {
  Registered = 'registered',
  Invoice = 'invoice'
}

export interface Address {
  id: number
  entity: ENTITIES
  entity_id: number
  name: string
  line1: string
  line2: string
  line3: string
  city: string
  postcode: string
  county: string
  meta: any
  created_at: string
  updated_at: string
  status: ADDRESS_STATUS
}
