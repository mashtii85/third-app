/**
 * Components - Account - List - Table - Hooks - useCreate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_ACCOUNT, GET_ACCOUNTS } from '../../queries/queries'

// Types
import { UseCreateAccountOutput, UseCreateAccountProps } from '../types'
import { prepareUseAccounts } from '../useAccounts/helpers'

export const useCreateAccount = (props: UseCreateAccountProps): UseCreateAccountOutput => {
  const [createAccount, { error, loading }] = useMutation(CREATE_ACCOUNT, {
    onCompleted: props.onCompleted,
    onError: props.onError,

    update(cache, { data }) {
      const accountFromResponse = data?.account
      const variables = prepareUseAccounts(props?.filters)

      const { accounts } = cache.readQuery({
        query: GET_ACCOUNTS,
        variables
      }) || { accounts: [] }

      cache.writeQuery({
        query: GET_ACCOUNTS,
        variables,
        data: { accounts: [...accounts, accountFromResponse] }
      })
    }
  })

  return { createAccount, error, loading }
}
