/**
 * Components - Addresses - Hooks - useAddresses
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ADDRESSES } from '../queries/queries'
import { AddressesData, AddressesVariables, UseAddressProps } from './types'
import { prepareArguments } from './helpers'

export const useAddresses = (filters: UseAddressProps) => {
  const where = prepareArguments({ filters })
  const { data, error, loading } = useQuery<AddressesData, AddressesVariables>(GET_ADDRESSES, {
    variables: {
      where
    }
  })

  if (error) {
    return { loading: false, error, addressList: [] }
  }

  return { loading, addressList: data?.address || [] }
}
