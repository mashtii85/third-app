/**
 * Components - Addresses - Hooks - types
 */

// Constants
import { ENTITIES, STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Filter } from '../general'
import { Address } from './address'

export interface AddressFilter extends Filter {
  entity: ENTITIES
  entityId: number
  name: string
  line: string
  city: string
  county: string
  postcode: string
  type: string
  default: string
  status: STATUS_ACTIVE
}

export interface UseAddressProps {
  entity: ENTITIES
  entityId: number
  type: string
  status: STATUS_ACTIVE
}

export interface AddressesData {
  address: Address[]
}

export interface AddressData {
  address: Address
}

export interface AddressVariables {
  addressId: number
}
