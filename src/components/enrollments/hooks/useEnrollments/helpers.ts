/**
 * Components - Enrollments - Hooks - UseEnrollments - Helpers
 */

// Types
import { LooseObject } from '../../../../types/object'
import { EnrollmentFilters } from './types'

export const prepareVariables = ({
  filters
}: {
  filters?: EnrollmentFilters
}): LooseObject | null => {
  if (!filters) {
    return null
  }

  const variables: LooseObject = {}
  if (filters?.courseId) {
    variables.course_id = { _eq: filters.courseId }
  }
  if (filters?.accountId) {
    variables.account_id = { _eq: filters.accountId }
  }
  if (filters?.status) {
    variables.status = { _eq: filters.status }
  }
  if (filters?.userStatus) {
    variables.user = { status: { _eq: filters.userStatus } }
  }
  if (filters?.q) {
    variables.course = { title: { _ilike: filters.q } }
  }
  return variables
}
