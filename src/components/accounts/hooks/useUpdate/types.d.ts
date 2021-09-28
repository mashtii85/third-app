/**
 * Components - Account - List - Table - Hooks - useUpdate
 */

import { ApolloError } from '@apollo/client'
import { UseHookOutput } from '../../../../types/hook'

export interface UseUpdateAccountProps {
  onCompleted: (data: { account }) => void
  onError: (data: ApolloError) => void
}

export interface UseUpdateAccountOutput extends UseHookOutput {
  updateAccount: any
}
