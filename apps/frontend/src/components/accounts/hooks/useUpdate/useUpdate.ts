/**
 * Components - Account - List - Table - Hooks - useUpdate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_ACCOUNT_USER } from '@availabletowork/queries'

// Types
import { Account, UseHookProps, UseUpdateAccountOutput } from '@availabletowork/types'

export const useUpdateAccount = (props: UseHookProps<Account>): UseUpdateAccountOutput => {
  const [updateAccount, { error, loading }] = useMutation(UPDATE_ACCOUNT_USER, {
    onCompleted: props.onCompleted,
    onError: props.onError
  })

  return { updateAccount, error, loading }
}
