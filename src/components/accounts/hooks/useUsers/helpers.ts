/**
 * Components - AccountUsers - Hooks - UseUserAccounts - UseUserAccounts
 */

// Types
import { GQLClause, GraphqlWhere } from '../../../../types/gql'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { User } from '../../../../types/user'
import { UsersFilter } from '../../types'

export const prepareUsersArguments = (filters: UsersFilter): GQLClause<User> => {
  const condition: GraphqlWhere<User> = { status: { _eq: STATUS_ACTIVE.Active } }

  if (filters.accountId) {
    // @ts-ignore
    condition.accounts = { account: { id: { _eq: filters.accountId } } }
  }

  if (filters?.q) {
    condition._or = [{ name_first: { _ilike: filters.q } }, { name_last: { _ilike: filters.q } }]
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
