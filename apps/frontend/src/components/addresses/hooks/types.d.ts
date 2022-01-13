/**
 * Components - Addresses - Hooks - types
 */

// Types
import { ENTITIES } from '../../../constants/entities'
import { Address } from '../../../types/address.d'
import { Filter } from '../../../types/filter'
import { STATUS_ACTIVE } from '../../../types/select.d'

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
