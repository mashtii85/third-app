/**
 * Components - Locations - List - Table - Hooks - helpers
 */

// Types
import { GQLClause, GraphqlWhere } from '../../../../types/gql'
import { Location } from '../../types'
import { PrepareLocationArgumentProps } from './types.d'

export const prepareLocationsArguments = ({
  filters
}: PrepareLocationArgumentProps): GQLClause<Location> => {
  const condition: GraphqlWhere<Location> = {}

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
    limit: filters?.limit ?? null,
    offset: filters?.offset ?? null,
    order_by: filters?.orderBy ?? {}
  }

  return { ...otherClause, where: condition }
}
