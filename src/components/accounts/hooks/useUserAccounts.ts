/**
 * Components - UserAccounts- Hooks - useUserAccounts
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ACCOUNT_USER } from '../queries/queries'
import { UserData, Variable } from './types'

export const useUserAccounts = ({ accountId }: Variable) => {
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
