/**
 *  Components - Enrollments - queries
 */

// Apollo
import { gql } from '@apollo/client'

export const ENROLLMENTS_FIELDS = gql`
  fragment EnrollmentFields on course_enrollment {
    id
    status
    created_at
    course_id
    account_id
    updated_at
  }
`
export const COURSE_ENROLLMENT_AGGREGATE_FIELDS = gql`
  fragment EnrollmentsAggregateFields on course_enrollment_aggregate {
    aggregate {
      count
    }
  }
`
