/**
 * Components - Locations - List - Table - Hooks - helpers
 */

// Types
import { GQLClause, GraphqlWhere } from '../../../../types/gql'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { Location } from '../../types'
import { PrepareLocationArgumentProps } from './types.d'

export const prepareLocationsArguments = ({
  filters
}: PrepareLocationArgumentProps): GQLClause<Location> => {
  const condition: GraphqlWhere<Location> = {
    status: { _eq: STATUS_ACTIVE.Active }
  }

  if (filters?.accountId) {
    condition.account_id = { _eq: filters.accountId }
  }

  if (filters?.q) {
    condition.name = { _ilike: filters.q }
  }

  if (filters?.status) {
    condition.status = { _eq: filters.status }
  }

  if (filters?.taxonomy) {
    condition.taxonomy_id = { _eq: filters.taxonomy.value }
  }

  const otherClause = {
    limit: filters?.limit,
    offset: filters?.offset,
    order_by: filters?.order_by ? filters.order_by : {}
  }

  return { ...otherClause, where: condition }
}
