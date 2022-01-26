/**
 * Components - Addresses - Hooks - useCreate - Types.d
 */

// Types.d
import { Address } from '.'
import { STATUS_ACTIVE, UseHookOutput } from '..'

export interface AddressCreateVariables {
  entity?: number
  entityId?: number
  name?: string
  line1?: string
  line2?: string
  line3?: string
  city?: string
  county?: string
  postcode?: string
  status?: STATUS_ACTIVE
}

export interface AddressCreateData {
  addresses: Address[]
}

export interface UseCreateAddressOutput extends UseHookOutput {
  createAddress: any
}
