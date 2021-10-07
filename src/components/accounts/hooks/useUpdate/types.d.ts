/**
 * Components - Account - List - Table - Hooks - useUpdate
 */

import { ApolloError } from '@apollo/client'
import { Account } from '../../../../types/account'
import { UseHookOutput } from '../../../../types/hook'

export interface UseUpdateAccountProps {
  onCompleted: (data: { account: Account }) => void
  onError: (data: ApolloError) => void
}

export interface UseUpdateAccountOutput extends UseHookOutput {
  updateAccount: any
}
