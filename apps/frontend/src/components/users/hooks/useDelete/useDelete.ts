/**
 * Components - Users - Hooks - useDeleteUser - useDeleteUser
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_USER_ACCOUNT_BY_USERID, GET_USERS } from '../../queries'

// Types
import {
  User,
  UserDeleteData,
  UserDeleteVariables,
  useDeleteUserProps,
  useDeleteUserOutput
} from '@availabletowork/types'

// Helpers
import { prepareUsersArguments } from '../helpers'

export const useDeleteUser = (props: useDeleteUserProps): useDeleteUserOutput => {
  const [deleteUser, { loading, error }] = useMutation<UserDeleteData, UserDeleteVariables>(
    DELETE_USER_ACCOUNT_BY_USERID,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const variables = prepareUsersArguments(props.filters)
        const { users } = cache.readQuery<{ users: User[] }>({
          query: GET_USERS,
          variables
        }) || { users: [] }

        const userList = users.filter((user) => user.id !== data?.users?.returning[0]?.user?.id)
        cache.writeQuery({
          query: GET_USERS,
          variables,
          data: { users: userList }
        })
      }
    }
  )

  return { deleteUser, error, loading }
}
