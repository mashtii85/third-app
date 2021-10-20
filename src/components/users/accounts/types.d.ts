/**
 * Components - Users - Accounts - Types.d
 */

import { ACCOUNT_TYPE } from '../../../types/account'
import { LooseObject } from '../../../types/object'
import { User, USER_STATUS } from '../../../types/user'

interface UserAccountTableProps {
  user: User | LooseObject
  loading: boolean
}

export interface AccountProfileRows {
  id: number
  name: string
  status: USER_STATUS
  accountId: number
  url: string
  accountSelected: {
    label: string
    type: ACCOUNT_TYPE
    value: number
  }
  actions: string
}
