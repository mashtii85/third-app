import { ApolloError } from '@apollo/client'

import { Account } from '../../../types/account'
import { LooseObject } from '../../../types/object'
import { User } from '../../../types/user'

export interface AccountData {
  accounts?: Account[]
  account?: Account | any
}

export interface UserData {
  users?: User[]
}

export interface Variable {
  accountId?: number
  accountType?: string
  clientId?: number
  status?: string
}
export interface AccountVariables {
  variables: Variable
  accountType: string
  clientId: number
  status: string
  where: LooseObject
}

export interface UseCreateAccountProps {
  // eslint-disable-next-line camelcase
  onCompleted: (data: { insert_account }) => void
  onError: (data: ApolloError) => void
}
