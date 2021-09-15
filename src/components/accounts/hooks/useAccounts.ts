/**
 * Components - Accounts- Hooks - useAccounts
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ACCOUNTS } from '../queries/queries'
import { AccountData, Variable } from './types'

export const useAccounts = ({ clientId }: Variable) => {
  const { data, error, loading } = useQuery<AccountData, any>(GET_ACCOUNTS, {
    variables: {
      clientId
    }
  })

  if (error) {
    return { loading: false, error }
  }

  return { loading, accounts: data?.accounts }
}
