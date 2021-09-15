/**
 * Components - Enrollments - Hooks - UseEnrolledUsers - Helpers
 */

// Types
import { LooseObject } from '../../../../types/object.d'
import { EnrolledUsersFilters } from './types.d'

// useEnrolledUser
export const prepareVariables = ({
  clientId,
  courseId,
  filters
}: {
  clientId: number
  courseId?: number
  filters?: EnrolledUsersFilters
}): LooseObject | null => {
  if (!courseId && !filters) {
    return null
  }

  const variables: LooseObject = {}
  if (courseId) {
    variables.course_id = { _eq: courseId }
  }
  if (clientId) {
    variables.client_id = { _eq: clientId }
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
