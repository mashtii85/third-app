import { Account } from './account'
import { AccountFilters } from './types'
import { UseHookOutput } from '../general/hook'
import { LooseObject } from '../general/object'

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
