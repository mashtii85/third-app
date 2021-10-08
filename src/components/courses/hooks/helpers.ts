/**
 * Components - Courses - List - Table - Hooks - helpers
 */

import { nullFreeObject } from '../../../utils/nullFreeObject'

// Types
import { STATUS_ACTIVE } from '../../../types/select.d'
import { PrepareCourseArgumentProps } from './types'
import { Course } from '../../../types/course'
import { GQLClause, GraphqlWhere } from '../../../types/gql'
import { CourseDB } from '../types'

export const prepareCoursesArguments = ({
  filters
}: PrepareCourseArgumentProps): GQLClause<Course> => {
  nullFreeObject(filters)

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

  // if (filters.ta)
  const otherClause = {
    limit: filters?.limit,
    offset: filters?.offset,
    order_by: filters?.order_by ? filters.order_by : {}
  }

  return { ...otherClause, where: condition }
}
