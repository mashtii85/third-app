/**
 * Components - UserAccounts- Hooks - useUserAccounts
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ACCOUNT_USER } from '../queries/queries'

// Types
import { UserData, UseAccountsVariable, UseUserAccountsOutput } from './types.d'

export const useUserAccounts = ({ accountId }: UseAccountsVariable): UseUserAccountsOutput => {
  const result = useQuery<UserData, any>(GET_ACCOUNT_USER, {
    variables: {
      accountId
    }
  })

  const { data, error, loading } = result

  if (error) {
    return { loading: false, error }
  }

  return { loading, users: data?.users }
}
