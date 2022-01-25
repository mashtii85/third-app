/**
 * Components - Accounts - Types.d
 */

import { Filter } from '../general/filter'
import { Options } from '../general/options'
import { STATUS_ACTIVE } from '../general/select.d'
import { ACCOUNT_TYPE } from './account.d'

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
