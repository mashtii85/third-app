/**
 * Components - Addresses - Hooks - types
 */

// Types
import { ENTITIES } from '../../../constants/entities'
import { Address, ADDRESS_STATUS } from '../../../types/address.d'
import { LooseObject } from '../../../types/object'

export interface AddressFilter {
  entity: ENTITIES
  entityId: number
  name: string
  line: string
  city: string
  county: string
  postcode: string
  type: string
  default: string
  status: ADDRESS_STATUS
}

export interface UseAddressProps {
  entity: ENTITIES
  entityId: number
  type: string
  status: ADDRESS_STATUS
}

export interface AddressesData {
  address: Address[]
}

export interface AddressesVariables {
  where: LooseObject
}

export interface AddressData {
  address: Address
}

export interface AddressVariables {
  addressId: number
}
