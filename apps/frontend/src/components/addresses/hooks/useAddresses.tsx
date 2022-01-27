/**
 * Components - Addresses - Hooks - useAddresses
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ADDRESSES } from '../queries/queries'

// Types
import { Address, AddressesData, AddressFilter, GQLClause } from '@availabletowork/types'

// Helpers
import { prepareArguments } from './helpers'

export type AddressesVariables1 = {
  variables: GQLClause<Address>
}

export const useAddresses = (filters: Partial<AddressFilter>) => {
  const variables = prepareArguments({ filters })

  const { data, error, loading, refetch } = useQuery<AddressesData>(GET_ADDRESSES, {
    variables
  })

  return { error, loading, addressList: data?.address || [], refetch }
}
