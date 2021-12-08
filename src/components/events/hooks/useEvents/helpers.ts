/**
 * Components - Events - List - Table - Hooks - helpers
 */

// Types
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

  const otherClause = {
    limit: filters?.limit ?? null,
    offset: filters?.offset ?? null,
    order_by: filters?.orderBy ?? {}
  }

  return { ...otherClause, where: { ...condition } }
}
