/**
 * Components - Account - Hooks - useAccount
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ACCOUNT } from '../../queries'

// Types
import { AccountData, UseAccountOutput, UseAccountVariable } from './types.d'

export const useAccount = ({ accountId }: Partial<UseAccountVariable>): UseAccountOutput => {
  const { data, error, loading } = useQuery<Partial<AccountData>, any>(GET_ACCOUNT, {
    variables: {
      accountId
    }
  })

  if (error) {
    return { loading: false, error }
  }
  return { loading, account: data?.account }
}
