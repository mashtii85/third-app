/**
 * Components - Account - List - Table - Hooks - useUpdate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UseHookProps } from '../../../../types/hook'
import { Account } from '../../../../types/account'
import { UPDATE_ACCOUNT_USER } from '../../queries'

// Types
import { UseUpdateAccountOutput } from './types'

export const useUpdateAccount = (props: UseHookProps<Account>): UseUpdateAccountOutput => {
  const [updateAccount, { error, loading }] = useMutation(UPDATE_ACCOUNT_USER, {
    onCompleted: props.onCompleted,
    onError: props.onError
  })

  return { updateAccount, error, loading }
}
