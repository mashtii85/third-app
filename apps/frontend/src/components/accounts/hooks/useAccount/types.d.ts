/**
 * Components - Accounts - Hooks - useAccount - Types.d
 */

// Types
import { Account } from '../../../../types/account'
import { UseHookOutput } from '../../../../types/hook'
import { AccountFilters } from '../../types'

export interface UseAccountVariable {
  filters: Partial<AccountFilters>
  accountId: number
}

export interface AccountData {
  accounts: Account[]
  account: Account | any
}

export interface UseCreateAccountOutput extends UseHookOutput {
  createAccount?: any
}

export interface UseAccountOutput extends UseHookOutput {
  account?: Account
}
