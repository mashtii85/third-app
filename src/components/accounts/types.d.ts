/**
 * Components - Accounts - Types.d
 */

import { ACCOUNT_TYPE } from '../../types/account.d'
import { Filter } from '../../types/filter'
import { Options } from '../../types/options'
import { STATUS_ACTIVE } from '../../types/select'

export interface AccountFilters extends Filter {
  accountId: number
  clientId: number
  accountType: ACCOUNT_TYPE
  userType: ACCOUNT_TYPE
  userId: number
  taxonomy: Options
  status: STATUS_ACTIVE
}

export interface UsersFilter extends Filter {
  accountId: number
  status: STATUS_ACTIVE
  taxonomy: Options
}
