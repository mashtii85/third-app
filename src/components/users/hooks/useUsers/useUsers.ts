/**
 * Components - AccountUsers - Hooks - UseUserAccounts - UseUserAccounts
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_USERS } from '../../queries'
import { UsersFilter } from '../../../accounts/types'

// Types
import { prepareUsersArguments } from '../helpers'
import { UserData, UseUsersOutput } from './types'

export const useUsers = ({ filters }: { filters: UsersFilter }): UseUsersOutput => {
  const variables = prepareUsersArguments(filters)

  const { data, error, loading } = useQuery<UserData>(GET_USERS, {
    variables
  })

  const users = data?.users ?? []

  return { error, loading, users }
}
