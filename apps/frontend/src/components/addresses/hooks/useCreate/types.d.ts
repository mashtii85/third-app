/**
 * Components - Addresses - Hooks - useCreate - Types.d
 */

// Types.d
import { Address } from '../../../../types/address.d'
import { UseHookOutput } from '../../../../types/hook.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'

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
