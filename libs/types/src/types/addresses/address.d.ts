/**
 * Types - Address
 */

// Constants
import { ENTITIES } from '../../constants'
import { STATUS_ACTIVE } from '../general'

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
  status: STATUS_ACTIVE
}

export interface AddressToolbarType {
  entity: ENTITIES
  entityId: number
  type: string
}
