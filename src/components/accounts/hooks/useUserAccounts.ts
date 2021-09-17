/**
 * Components - UserAccounts- Hooks - useUserAccounts
 */

// Apollo
import { useQuery } from '@apollo/client'
import { UseHookOutput } from '../../../types/hook'
import { GET_ACCOUNT_USER } from '../queries/queries'
import { UserData, UseAccountsVariable } from './types'

export const useUserAccounts = ({ accountId }: UseAccountsVariable): UseHookOutput => {
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
