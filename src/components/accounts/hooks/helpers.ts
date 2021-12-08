/**
 * Components - Accounts- Hooks - UseAccounts -  Helpers
 */

// Types
import { Account } from '../../../types/account.d'
import { GQLClause, GraphqlWhere } from '../../../types/gql.d'
import { STATUS_ACTIVE } from '../../../types/select.d'
import { AccountFilters } from '../types.d'

export const prepareUseAccounts = (filters?: Partial<AccountFilters>): GQLClause<Account> => {
  const variables: GQLClause<Account> = {}

  const condition: GraphqlWhere<Account> = {}

  if (filters?.accountId) {
    condition.client_id = { _eq: filters.accountId }
  }
  if (filters?.q) {
    condition.name = { _ilike: filters.q }
  }
  if (filters?.accountId) {
    condition.client_id = { _eq: filters.accountId }
  }
  if (filters?.userType) {
    condition.type = { _eq: filters.userType }
  }

  if (filters?.taxonomy) {
    condition.taxonomy_id = { _eq: filters.taxonomy.value }
  }

  if (filters?.status === STATUS_ACTIVE.Inactive) {
    condition.status = { _eq: filters.status }
  }

  variables.limit = filters?.limit ?? null
  variables.offset = filters?.offset ?? null
  variables.order_by = filters?.orderBy ?? {}

  variables.where = condition
  return variables
}
