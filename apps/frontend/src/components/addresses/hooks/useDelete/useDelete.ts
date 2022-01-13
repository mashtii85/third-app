/**
 * Components - Addresss - Hooks - useDelete - useDelete
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_ADDRESS_BY_PK, GET_ADDRESSES } from '../../queries/queries'

// Types
import { AddressDeleteData, AddressDeleteVariables, UseDeleteAddressOutput } from './types.d'
import { UseHookProps } from '../../../../types/hook.d'
import { Address } from '../../../../types/address.d'
import { UseAddressProps } from '../types.d'

// Helpers
import { prepareArguments } from '../helpers'

export const useDeleteAddress = (
  filters: Partial<UseAddressProps>,
  props: UseHookProps<AddressDeleteData>
): UseDeleteAddressOutput => {
  const [deleteAddress, { loading, error }] = useMutation<
    AddressDeleteData,
    AddressDeleteVariables
  >(DELETE_ADDRESS_BY_PK, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const variables = prepareArguments({ filters })
      const { address } = cache.readQuery<{ address: Address[] }>({
        query: GET_ADDRESSES,
        variables
      }) || { address: [] }
      const addressList = address.filter((adr) => adr.id !== data?.delete_address_by_pk.id)
      cache.writeQuery({
        query: GET_ADDRESSES,
        variables,
        data: { address: addressList }
      })
    }
  })
  return { error, loading, deleteAddress }
}
