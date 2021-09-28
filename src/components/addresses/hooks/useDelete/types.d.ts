/**
 * Components - Addresses - Hooks - useDelete - Types.d
 */

// Types.d
import { Address } from '../../../../types/address.d'
import { UseHookOutput, UseHookProps } from '../../../../types/hook.d'
import { AddressFilter } from '../../hooks/types.d'

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
