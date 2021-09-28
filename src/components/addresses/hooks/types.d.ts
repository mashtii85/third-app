/**
 * Components - Addresses - Hooks - types
 */

// Types
import { Address, ADDRESS_STATUS } from '../../../../types/address.d'
import { LooseObject } from '../../../types/object'

export interface AddressFilter {
  name?: string
  line?: string
  city?: string
  county?: string
  postcode?: string
  status?: ADDRESS_STATUS
}

export interface UseAddressProps {
  entity: string
  entityId: number
  type?: string
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
