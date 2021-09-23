/**
 * Components - Account - Hooks - useAccount
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ACCOUNT } from '../../queries'

// Types
import { AccountData, UseAccountOutput, UseAccountVariable } from '../types.d'

export const useAccount = ({ accountId }: UseAccountVariable): UseAccountOutput => {
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
