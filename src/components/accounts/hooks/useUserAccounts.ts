/**
 * Components - UserAccounts- Hooks - useUserAccounts
 */

// Apollo
import { useQuery } from '@apollo/client'
import { ACCOUNT_TYPE } from '../../../types/account.d'
import { GET_ACCOUNT_USER } from '../queries'

// Types
import { UserData, UseUserAccountsOutput } from './types.d'

export const useUserAccounts = ({
  accountId,
  type
}: {
  accountId: number
  type: ACCOUNT_TYPE
}): UseUserAccountsOutput => {
  // Todo add type to query
  console.log(type)
  const result = useQuery<UserData, any>(GET_ACCOUNT_USER, {
    variables: {
      accountId
    }
  })

  const { data, error, loading } = result

  if (error) {
    return { loading: false, error }
  }

  return { loading, users: data?.users || [] }
}
