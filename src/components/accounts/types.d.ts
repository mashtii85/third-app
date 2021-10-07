/**
 * Components - Accounts - Types.d
 */

import { ACCOUNT_TYPE } from '../../types/account.d'
import { Filter } from '../../types/filter'

export interface AccountFilters extends Filter {
  accountId: number
  type: ACCOUNT_TYPE
  clientId: number
}
