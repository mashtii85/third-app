import { ApolloError } from '@apollo/client'

import { Account } from '../../../types/account.d'
import { UseHookOutput } from '../../../types/hook.d'
import { LooseObject } from '../../../types/object'
import { User } from '../../../types/user'

export interface AccountData {
  accounts?: Account[]
  account?: Account | any
}

export interface UserData {
  users?: User[]
}

export interface UseAccountsVariable {
  accountId?: number
  accountType?: string
  clientId?: number
  status?: string
  type?: string
}

export interface UseUserOutput extends UseHookOutput {
  users?: User
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
  onCompleted: (data: { insert_account }) => void
  onError: (data: ApolloError) => void
}

export interface UseCreateAccountOutput extends UseHookOutput {
  createAccount: any
}

export interface UseAccountOutput extends UseHookOutput {
  account?: Account
}
