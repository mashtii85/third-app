/**
 * Components - Addresses - Hooks - useUpdate - Types.d
 */

// Types.d
import { Address, ADDRESS_STATUS } from '../../../../types/address.d'
import { UseHookOutput } from '../../../../types/hook.d'

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
    status?: ADDRESS_STATUS
  }
}

export interface AddressUpdateData {
  address: Address
}

export interface UseUpdateAddressOutput extends UseHookOutput {
  updateAddress: any
}
