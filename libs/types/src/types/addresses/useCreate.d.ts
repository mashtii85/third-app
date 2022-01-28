/**
 * Components - Addresses - Hooks - useCreate - Types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types.d
import { Address } from '.'
import { UseHookOutput } from '..'

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
