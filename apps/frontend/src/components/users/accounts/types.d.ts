/**
 * Components - Users - Accounts - Types.d
 */

// Types
import { ACCOUNT_TYPE } from '../../../types/account.d'
import { User, USER_STATUS } from '../../../types/user.d'

interface UserAccountTableProps {
  user: Partial<User>
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
