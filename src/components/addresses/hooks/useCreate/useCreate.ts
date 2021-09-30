/**
 * Components - Addresses - Hooks - useCreate - useCreate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_ADDRESS, GET_ADDRESSES } from '../../queries/queries'

// Types
import { AddressCreateData, AddressCreateVariables, UseCreateAddressOutput } from './types.d'
import { UseAddressProps } from '../types'
import { UseHookProps } from '../../../../types/hook.d'
import { Address } from '../../../../types/address.d'

// Helpers
import { prepareArguments } from '../helpers'

export const useCreateAddress = (
  filters: UseAddressProps,
  props: UseHookProps<AddressCreateData>
): UseCreateAddressOutput => {
  const [createAddress, { error, loading }] = useMutation<
    AddressCreateData,
    AddressCreateVariables
  >(CREATE_ADDRESS, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const where = prepareArguments({ filters })
      const { address } = cache.readQuery<{ address: Address[] }>({
        query: GET_ADDRESSES,
        variables: { where }
      }) || { address: [] }
      cache.writeQuery({
        query: GET_ADDRESSES,
        variables: { where },
        data: { address: [...address, data?.addresses] }
      })
    }
  })
  return { error, loading, createAddress }
}
