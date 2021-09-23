/**
 * Components - Addresses - Hooks - useCreate - Types.d
 */

// Types.d
import { Address, ADDRESS_STATUS } from '../../../../types/address.d'
import { UseHookOutput } from '../../../../types/hook.d'

export interface AddressCreateVariables {
  entity?: number
  entityId?: number
  name?: string
  line1?: string
  line2?: string
  line3?: string
  city?: String
  county?: string
  postcode?: string
  status?: ADDRESS_STATUS
}

export interface AddressCreateData {
  insert_address_one: Address
}

export interface UseCreateAddressOutput extends UseHookOutput {
  createAddress: any
}
