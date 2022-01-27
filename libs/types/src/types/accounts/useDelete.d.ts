/**
 * Components - Accounts - Hooks - UseDelete - Types.d
 */

// Types.d
import { UseHookOutput, UseHookProps } from '../general/hook'
import { Account } from './account'
import { AccountFilters } from './types'

export interface AccountDeleteVariables {
  accountId: number
}

export interface AccountDeleteData {
  account: Account
}

export interface useDeleteAccountProps extends UseHookProps<AccountDeleteData> {
  filters?: Partial<AccountFilters>
}

export interface useDeleteAccountOutput extends UseHookOutput {
  deleteAccount: any
}
