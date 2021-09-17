/**
 * Components - Account - List - Table - Hooks - useCreate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_ACCOUNT, GET_ACCOUNTS } from '../queries/queries'

// Types
import { UseCreateAccountOutput, UseCreateAccountProps } from './types.d'

export const useCreateAccount = (props: UseCreateAccountProps): UseCreateAccountOutput => {
  const [createAccount, { error, loading }] = useMutation(CREATE_ACCOUNT, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const [accountFromResponse] = data?.insert_account?.returning

      const where = {}

      const { account } = cache.readQuery({
        query: GET_ACCOUNTS,
        variables: {
          ...where
        }
      }) || { account: [] }

      cache.writeQuery({
        query: GET_ACCOUNTS,
        variables: { ...where },
        data: { accounts: [...account, accountFromResponse] }
      })
    }
  })

  return { createAccount, error, loading }
}
