/**
 * Components - Account - Hooks - useAccount
 */

// Apollo
import { useQuery } from '@apollo/client'
import { useEffect } from 'react'
import { GET_ACCOUNT } from '@availabletowork/queries'

// Types
import { AccountData, UseAccountOutput, UseAccountVariable } from '@availabletowork/types'

export const useAccount = ({ accountId }: Partial<UseAccountVariable>): UseAccountOutput => {
  const { data, error, loading, refetch } = useQuery<Partial<AccountData>, any>(GET_ACCOUNT, {
    variables: {
      accountId
    }
  })

  useEffect(() => {
    refetch()
  }, [accountId])

  return { account: data?.account, error, loading }
}
