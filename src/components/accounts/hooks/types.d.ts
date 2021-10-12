import { Account } from '../../../types/account.d'
import { UseHookOutput } from '../../../types/hook.d'
import { LooseObject } from '../../../types/object'
import { User } from '../../../types/user'
import { AccountFilters } from '../types'

export interface UseUserAccountsOutput extends UseHookOutput {
  users?: User[]
}

export interface UserData {
  users?: User[]
}

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
