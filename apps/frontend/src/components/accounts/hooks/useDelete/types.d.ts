/**
 * Components - Accounts - Hooks - UseDelete - Types.d
 */

// Types.d
import { Account } from '../../../../types/account'
import { UseHookOutput, UseHookProps } from '../../../../types/hook.d'
import { AccountFilters } from '../../types'

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
