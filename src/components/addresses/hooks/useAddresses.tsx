/**
 * Components - Addresses - Hooks - useAddresses
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ADDRESSES } from '../queries/queries'
import { AddressesData, AddressFilter } from './types.d'
import { prepareArguments } from './helpers'

export const useAddresses = (filters: Partial<AddressFilter>) => {
  const variables = prepareArguments({ filters })
  const { data, error, loading, refetch } = useQuery<AddressesData>(GET_ADDRESSES, {
    variables
  })

  if (error) {
    return { loading: false, error, addressList: [] }
  }

  return { loading, addressList: data?.address || [], refetch }
}
