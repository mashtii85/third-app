/**
 * Components - Addresses - Hooks - useUpdate - Types.d
 */

// Types.d
import { Address } from '../../../../types/address.d'
import { UseHookOutput } from '../../../../types/hook.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'

export interface AddressUpdateVariables {
  id: number
  changes: {
    name?: string
    line1?: string
    line2?: string
    line3?: string
    city?: string
    county?: string
    postcode?: string
    status?: STATUS_ACTIVE
  }
}

export interface AddressUpdateData {
  address: Address
}

export interface UseUpdateAddressOutput extends UseHookOutput {
  updateAddress: any
}
