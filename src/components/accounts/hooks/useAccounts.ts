/**
 * Components - Accounts- Hooks - useAccounts
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ACCOUNTS } from '../queries/queries'
import { AccountData, UseAccountsOutput, UseAccountsVariable } from './types.d'

export const useAccounts = ({ clientId }: UseAccountsVariable): UseAccountsOutput => {
  const { data, error, loading } = useQuery<AccountData, any>(GET_ACCOUNTS, {
    variables: {
      clientId
    }
  })

  if (error) {
    return { loading: false, error, accounts: data?.accounts || [] }
  }

  return { loading, accounts: data?.accounts }
}
