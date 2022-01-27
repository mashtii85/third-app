/**
 * Components - AccountUsers - Hooks - UseUserAccounts - UseUserAccounts
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../../queries'

// Helpers
import { prepareUsersArguments } from '../helpers'

// Types
import { UserData, UsersFilter, UseUsersOutput } from '@availabletowork/types'

export const useUsers = ({ filters }: { filters: UsersFilter }): UseUsersOutput => {
  const variables = prepareUsersArguments(filters)

  const { data, error, loading } = useQuery<UserData>(GET_USERS, {
    variables
  })

  const users = data?.users ?? []

  return { error, loading, users }
}
