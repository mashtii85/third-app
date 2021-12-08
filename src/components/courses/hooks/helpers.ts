/**
 * Components - Courses - List - Table - Hooks - helpers
 */

// Types
import { STATUS_ACTIVE } from '../../../types/select.d'
import { CourseDB, PrepareCourseArgumentProps } from './types.d'
import { GQLClause, GraphqlWhere } from '../../../types/gql.d'

export const prepareCoursesArguments = ({
  filters
}: PrepareCourseArgumentProps): GQLClause<CourseDB> => {
  let condition: GraphqlWhere<CourseDB> = { status: { _eq: STATUS_ACTIVE.Active } }

  if (filters?.accountId) {
    condition.account_id = { _eq: filters.accountId }
  }

  if (filters?.q) {
    condition = {
      _or: [{ title: { _ilike: filters.q } }, { description: { _ilike: filters.q } }]
    }
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
