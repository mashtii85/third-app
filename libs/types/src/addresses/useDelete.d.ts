/**
 * Components - Addresses - Hooks - useDelete - Types.d
 */

// Types.d
import { Address, AddressFilter } from '.'
import { UseHookOutput, UseHookProps } from '../general'

export interface AddressDeleteVariables {
  id: number
}

export interface AddressDeleteData {
  delete_address_by_pk: Address
}

export interface useDeleteAddressProps extends UseHookProps<AddressDeleteData> {
  filters: AddressFilter
  id: number
}

export interface UseDeleteAddressOutput extends UseHookOutput {
  deleteAddress: any
}
