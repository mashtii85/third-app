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
  }
`
export const COURSE_AGGREGATE_FIELDS = gql`
  fragment EnrollmentsAggregateFields on course_enrollments_aggregate {
    aggregate {
      count
    }
  }
`
