/**
 * Components - Account - List - Table - Hooks - useUpdate
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_ACCOUNT_USER } from '../../queries'

// Types
import { UseUpdateAccountOutput, UseUpdateAccountProps } from './types'
// import { prepareUseAccounts } from '../useAccounts/helpers'

export const useUpdateAccount = (props: UseUpdateAccountProps): UseUpdateAccountOutput => {
  // const variables = prepareUseAccounts(props.filters)
  const [updateAccount, { error, loading }] = useMutation(UPDATE_ACCOUNT_USER, {
    onCompleted: props.onCompleted,
    onError: props.onError
  })

  return { updateAccount, error, loading }
}
