/**
 * Components - Account - Hooks - useAccount
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_ACCOUNT } from '../queries/queries'
import { AccountData, Variable } from './types'

export const useAccount = ({ accountId }: Variable) => {
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
