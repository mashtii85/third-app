/**
 * Components - Accounts- Hooks - UseAccounts -  Helpers
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Account, AccountFilters, GQLClause, GraphqlWhere } from '@availabletowork/types'

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
