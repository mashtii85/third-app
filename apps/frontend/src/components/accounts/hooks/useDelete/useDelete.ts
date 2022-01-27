/**
 * Components - Accounts - Hooks - UseDelete - UseDeleteAccount
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_ACCOUNT_BY_ID, GET_ACCOUNTS } from '../../queries'

// Helpers
import { prepareUseAccounts } from '../helpers'

// Types
import {
  AccountDeleteData,
  AccountDeleteVariables,
  useDeleteAccountProps,
  useDeleteAccountOutput,
  Account
} from '@availabletowork/types'

export const useDeleteAccount = (props: useDeleteAccountProps): useDeleteAccountOutput => {
  const [deleteAccount, { loading }] = useMutation<AccountDeleteData, AccountDeleteVariables>(
    DELETE_ACCOUNT_BY_ID,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const accountFromResponse = data?.account

        const variables = prepareUseAccounts(props.filters)

        const { accounts } = cache.readQuery<{ accounts: Account[] }>({
          query: GET_ACCOUNTS,
          variables
        }) || { accounts: [] }

        const accountList = accounts.filter((account) => account.id !== accountFromResponse?.id)

        cache.writeQuery({
          query: GET_ACCOUNTS,
          variables,
          data: { accounts: accountList }
        })
      }
    }
  )

  return { deleteAccount, loading }
}
