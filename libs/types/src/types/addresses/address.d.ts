/**
 * Types - Address
 */

// Constants
import { ENTITIES, STATUS_ACTIVE } from '@availabletowork/constants'

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
