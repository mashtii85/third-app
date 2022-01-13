import { Account } from '../../../types/account.d'
import { UseHookOutput } from '../../../types/hook.d'
import { LooseObject } from '../../../types/object'
import { AccountFilters } from '../types'

export interface UseAccountsVariable {
  filters?: Partial<AccountFilters>
}

export interface UseAccountsOutput extends UseHookOutput {
  accounts?: Account[]
}

export interface AccountVariables {
  variables: UseAccountsVariable
  accountType: string
  clientId: number
  status: string
  where: LooseObject
}

// export interface UseCreateAccountProps extends UseHookProps<Account> {
//   filters?: Partial<AccountFilters>
// }
