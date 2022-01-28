/**
 * Components - Account - List - Table - Hooks - Types.d
 */

// Types
import { Account } from './account'
import { AccountFilters } from './types'
import { ApolloError } from '@apollo/client'
import { UseHookOutput } from '../general/hook'

export interface UseCreateAccountProps {
  filters?: Partial<AccountFilters>
  onCompleted: (data: { account: Account }) => void
  onError: (data: ApolloError) => void
}

export interface UseCreateAccountOutput extends UseHookOutput {
  createAccount: any
}
