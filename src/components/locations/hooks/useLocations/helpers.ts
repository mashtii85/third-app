/**
 * Components - Locations - List - Table - Hooks - helpers
 */

// Types
import { LooseObject } from '../../../../types/object'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { nullFreeObject } from '../../../../utils/nullFreeObject'
import { PrepareLocationArgumentProps } from './types.d'

export const prepareLocationsArguments = ({
  filters,
  accountId
}: PrepareLocationArgumentProps): LooseObject => {
  nullFreeObject(filters)
  const whereClause: LooseObject = {}
  whereClause.account_id = { _eq: accountId }
  if (filters?.q) {
    whereClause.name = { _ilike: filters.q }
  }

  if (filters?.status) {
    whereClause.status = { _eq: filters.status }
  } else {
    whereClause.status = { _eq: STATUS_ACTIVE.Active }
  }

  const otherClause = {
    limit: filters?.limit,
    offset: filters?.offset,
    order_by: filters?.orderBy ? filters.orderBy : {}
  }
  return { ...otherClause, where: whereClause }
}
