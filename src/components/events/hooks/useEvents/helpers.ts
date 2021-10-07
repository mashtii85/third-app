/**
 * Components - Events - List - Table - Hooks - helpers
 */

// Types
import { DBFilters } from '../../../../types/filter'
import { LooseObject } from '../../../../types/object'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { nullFreeObject } from '../../../../utils/nullFreeObject'
import { PrepareEventArgumentProps } from './types'

export const prepareEventsArguments = ({
  filters,
  accountId
}: PrepareEventArgumentProps): LooseObject => {
  nullFreeObject(filters)

  const condition: LooseObject = {}
  condition.account_id = { _eq: accountId }
  if (filters?.q) {
    condition.title = { _ilike: filters.q }
  }

  if (filters?.status) {
    condition.status = { _eq: filters.status }
  } else {
    condition.status = { _eq: STATUS_ACTIVE.Active }
  }

  const otherClause: DBFilters = {
    limit: filters?.limit,
    offset: filters?.offset,
    order_by: filters?.order_by ? filters.order_by : {}
  }

  return { ...otherClause, where: { ...condition } }
}
