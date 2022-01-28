/**
 * Components - Users - Hooks - Helpers
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { GQLClause, GraphqlWhere, User, UsersFilter } from '@availabletowork/types'

export const prepareUsersArguments = (filters?: Partial<UsersFilter>): GQLClause<User> => {
  const condition: GraphqlWhere<User> = { status: { _eq: STATUS_ACTIVE.Active } }

  if (filters?.accountId) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
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
    limit: filters?.limit ?? null,
    offset: filters?.offset ?? null,
    order_by: filters?.orderBy ?? {}
  }

  return { ...otherClause, where: condition }
}
