/**
 * Components - Account - Hooks - useAccount
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ACCOUNT } from '../queries/queries'

// Types
import { AccountData, UseAccountOutput, UseAccountsVariable } from './types.d'

export const useAccount = ({ accountId }: UseAccountsVariable): UseAccountOutput => {
  const { data, error, loading } = useQuery<AccountData, any>(GET_ACCOUNT, {
    variables: {
      accountId
    }
  })

  if (error) {
    return { loading: false, error }
  }
  return { loading, account: data?.account }
}
