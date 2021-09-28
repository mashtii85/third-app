/**
 * Components - Addresses - Hooks - useCreate - useCreate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { INSERT_ADDRESS_ONE, GET_ADDRESSES } from '../../queries/queries'

// Types
import { AddressCreateData, AddressCreateVariables, UseCreateAddressOutput } from './types.d'
import { UseAddressProps } from '../types'
import { UseHookProps } from '../../../../types/hook.d'
import { Address } from '../../../../types/address.d'
import { LooseObject } from '../../../../types/object.d'

export const useCreateAddress = (
  addressProps: UseAddressProps,
  props: UseHookProps<AddressCreateData>
): UseCreateAddressOutput => {
  const [createAddress, { error, loading }] = useMutation<
    AddressCreateData,
    AddressCreateVariables
  >(INSERT_ADDRESS_ONE, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const variables: LooseObject = {
        where: { entity: { _eq: addressProps.entity }, entity_id: { _eq: addressProps.entityId } }
      }
      if (addressProps.type) {
        variables.where.meta = { _contains: { type: addressProps.type } }
      }
      const { address } = cache.readQuery<{ address: Address[] }>({
        query: GET_ADDRESSES,
        variables
      }) || { address: [] }
      cache.writeQuery({
        query: GET_ADDRESSES,
        variables,
        data: { address: [...address, data?.insert_address_one] }
      })
    }
  })
  return { error, loading, createAddress }
}
