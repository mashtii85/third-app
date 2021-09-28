import { ApolloError } from '@apollo/client'

import { Account } from '../../../types/account.d'
import { UseHookOutput } from '../../../types/hook.d'
import { LooseObject } from '../../../types/object'
import { User } from '../../../types/user'
import { AccountFilters } from '../types'

export interface AccountData {
  accounts?: Account[]
  account?: Account | any
}

export interface UseUserAccountsOutput extends UseHookOutput {
  users?: User[]
}

export interface UserData {
  users?: User[]
}

export interface UseAccountVariable {
  filters?: AccountFilters
  accountId?: number
  // accountType?: ACCOUNT_TYPE
  // clientId?: number
  // status?: STATUS_ACTIVE
  // type?: string
}

export interface UseAccountsVariable {
  filters?: AccountFilters
  // accountId?: number
  // accountType?: ACCOUNT_TYPE
  // clientId?: number
  // status?: STATUS_ACTIVE
  // type?: string
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

export interface UseCreateAccountProps {
  filters?: AccountFilters
  onCompleted: (data: { account }) => void
  onError: (data: ApolloError) => void
}

export interface UseCreateAccountOutput extends UseHookOutput {
  createAccount: any
}

export interface UseAccountOutput extends UseHookOutput {
  account?: Account
}
