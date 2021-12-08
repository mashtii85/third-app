/**
 * Components - Addresses - Hooks - useAddresses
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ADDRESSES } from '../queries/queries'
import { AddressesData, AddressFilter } from './types.d'
import { prepareArguments } from './helpers'
import { Address } from '../../../types/address'
import { GQLClause } from '../../../types/gql'

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
