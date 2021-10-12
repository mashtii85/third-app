/**
 * Components - Accounts- Hooks - UseAccounts -  Helpers
 */

// Types
import { Account } from '../../../../types/account'
import { GQLClause, GraphqlWhere } from '../../../../types/gql'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { AccountFilters } from '../../types.d'

export const prepareUseAccounts = (filters?: Partial<AccountFilters>): GQLClause<Account> => {
  const variables: GQLClause<Account> = {}

  const condition: GraphqlWhere<Account> = { status: { _eq: STATUS_ACTIVE.Active } }

  if (filters?.accountId) {
    condition.client_id = { _eq: filters.accountId }
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

  variables.limit = filters?.limit
  variables.offset = filters?.offset
  variables.order_by = filters?.order_by || {
    created_at: 'desc'
  }

  variables.where = condition
  return variables
}
