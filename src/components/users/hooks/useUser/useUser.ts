/**
 * Components - AccountUsers - Hooks - UseUserAccounts - UseUserAccounts
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_USER } from '../../queries'

// Types
import { UserData, UserVariables, UseUserOutput } from './types.d'

export const useUser = (userId: number): UseUserOutput => {
  const { data, error, loading } = useQuery<UserData, UserVariables>(GET_USER, {
    variables: { userId }
  })

  const user = data?.user ?? {}

  return { error, loading, user }
}
