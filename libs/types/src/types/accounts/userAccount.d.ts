/**
 * Components - Accounts - Hooks - useAccount - Types.d
 */

// Types
import { Account, AccountFilters } from '.'
import { UseHookOutput } from '..'

export interface UseAccountVariable {
  filters: Partial<AccountFilters>
  accountId: number
}

export interface AccountData {
  accounts: Account[]
  account: Account | any
}

export interface UseAccountOutput extends UseHookOutput {
  account?: Account
}
