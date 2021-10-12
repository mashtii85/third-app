/**
 * Components - Account - List - Table - Hooks - Types.d
 */

// Types
import { Account } from '../../../../types/account'
import { UseHookOutput } from '../../../../types/hook'
import { AccountFilters } from '../../types'
import { ApolloError } from '@apollo/client'

export interface UseCreateAccountProps {
  filters?: Partial<AccountFilters>
  onCompleted: (data: { account: Account }) => void
  onError: (data: ApolloError) => void
}

export interface UseCreateAccountOutput extends UseHookOutput {
  createAccount: any
}
