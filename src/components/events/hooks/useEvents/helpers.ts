/**
 * Components - Events - List - Table - Hooks - helpers
 */

// Types
import { GQLFilters } from '../../../../types/filter'
import { GQLClause, GraphqlWhere } from '../../../../types/gql'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { Event } from '../../types'
import { PrepareEventArgumentProps } from './types'

export const prepareEventsArguments = ({
  filters
}: PrepareEventArgumentProps): GQLClause<Event> => {
  const condition: GraphqlWhere<Event> = { status: { _eq: STATUS_ACTIVE.Active } }

  if (filters?.accountId) {
    condition.account_id = { _eq: filters.accountId }
  }

  if (filters?.taxonomy) {
    condition.taxonomy_id = { _eq: filters.taxonomy.value }
  }

  if (filters?.q) {
    condition.title = { _ilike: filters.q }
  }

  if (filters?.status) {
    condition.status = { _eq: filters.status }
  }

  const otherClause: Partial<GQLFilters> = {
    limit: filters?.limit ?? 10,
    offset: filters?.offset ?? 0,
    order_by: filters?.order_by ? filters.order_by : {}
  }

  return { ...otherClause, where: { ...condition } }
}
