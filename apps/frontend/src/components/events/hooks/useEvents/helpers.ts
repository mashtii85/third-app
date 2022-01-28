/**
 * Components - Events - List - Table - Hooks - helpers
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Event, GQLClause, GraphqlWhere, PrepareEventArgumentProps } from '@availabletowork/types'

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

  const otherClause = {
    limit: filters?.limit ?? null,
    offset: filters?.offset ?? null,
    order_by: filters?.orderBy ?? {}
  }

  return { ...otherClause, where: { ...condition } }
}
