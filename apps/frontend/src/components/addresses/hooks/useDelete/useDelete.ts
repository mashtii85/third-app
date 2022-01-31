/**
 * Components - Address - Hooks - useDelete - useDelete
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_ADDRESS_BY_PK, GET_ADDRESSES } from '@availabletowork/queries'

// Types
import {
  Address,
  AddressDeleteData,
  AddressDeleteVariables,
  UseAddressProps,
  UseDeleteAddressOutput,
  UseHookProps
} from '@availabletowork/types'

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
