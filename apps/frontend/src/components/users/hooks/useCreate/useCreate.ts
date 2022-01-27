/**
 * Components - Users - Hooks - UseCreate - UseCreate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_USER, GET_USERS } from '../../queries'
import { prepareUsersArguments } from '../helpers'

// Helpers

// Types
import {
  UseCreateUserProps,
  UseCreateUserOutput,
  UserQueryData,
  CreateUserVariables
} from '@availabletowork/types'

export const useCreateUser = (props: UseCreateUserProps): UseCreateUserOutput => {
  const [createUser, { error, loading }] = useMutation<CreateUserVariables>(CREATE_USER, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const userFromResponse = data?.user
      const variables = prepareUsersArguments(props.filters)
      const { users } = cache.readQuery<UserQueryData>({
        query: GET_USERS,
        variables
      }) || { users: [] }

      cache.writeQuery({
        query: GET_USERS,
        variables,
        data: { users: [...users, userFromResponse] }
      })
    }
  })

  return { createUser, error, loading }
}
