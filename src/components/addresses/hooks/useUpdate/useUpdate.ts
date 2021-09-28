/**
 * Components - Addresses - Hooks - useUpdate - useUpdate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_ADDRESS_BY_PK } from '../../queries/queries'

// Types
import { AddressUpdateData, AddressUpdateVariables, UseUpdateAddressOutput } from './types.d'
import { UseHookProps } from '../../../../types/hook.d'

export const useUpdateAddress = (
  props: UseHookProps<AddressUpdateData>
): UseUpdateAddressOutput => {
  const [updateAddress, { loading, error }] = useMutation<
    AddressUpdateData,
    AddressUpdateVariables
  >(UPDATE_ADDRESS_BY_PK, {
    onCompleted: props.onCompleted,
    onError: props.onError
  })
  return { error, loading, updateAddress }
}
