/**
 * Components - Addresses - Hooks - useCreate - useCreate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_ADDRESS, GET_ADDRESSES } from '@availabletowork/queries'

// Types
import {
  Address,
  AddressCreateData,
  AddressCreateVariables,
  UseCreateAddressOutput,
  UseAddressProps,
  UseHookProps
} from '@availabletowork/types'

// Helpers
import { prepareArguments } from '../helpers'

export const useCreateAddress = (
  filters: Partial<UseAddressProps>,
  props: UseHookProps<AddressCreateData>
): UseCreateAddressOutput => {
  const [createAddress, { error, loading }] = useMutation<
    AddressCreateData,
    AddressCreateVariables
  >(CREATE_ADDRESS, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const variables = prepareArguments({ filters })
      const { address } = cache.readQuery<{ address: Address[] }>({
        query: GET_ADDRESSES,
        variables
      }) || { address: [] }
      cache.writeQuery({
        query: GET_ADDRESSES,
        variables,
        data: { address: [...address, data?.addresses] }
      })
    }
  })
  return { error, loading, createAddress }
}
