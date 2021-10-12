/**
 * Components - Account - Hooks - useAccount
 */

// Apollo
import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { GET_ACCOUNT } from '../../queries'

// Types
import { AccountData, UseAccountOutput, UseAccountVariable } from './types.d'

export const useAccount = ({ accountId }: Partial<UseAccountVariable>): UseAccountOutput => {
  const { data, error, loading, refetch } = useQuery<Partial<AccountData>, any>(GET_ACCOUNT, {
    variables: {
      accountId
    }
  })

  useEffect(() => {
    refetch()
  }, [accountId])

  if (error) {
    return { loading: false, error }
  }

  return { loading, account: data?.account }
}
