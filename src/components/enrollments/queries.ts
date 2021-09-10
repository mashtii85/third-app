/**
 *  Components - Enrollments - queries
 */

// Apollo
import { gql } from '@apollo/client'

export const ENROLLMENTS_FIELDS = gql`
  fragment GetEnrollmentFields on course_enrollment {
    id
    status
    created_at
    updated_at
    course {
      id
      title
      description
      media(limit: 1) {
        filename
      }
    }
  }
`

export const GET_ENROLLMENTS = gql`
  query GetEnrollments($userId: Int!) {
    enrollments: course_enrollment(where: { user_id: { _eq: $userId } }) {
      ...GetEnrollmentFields
    }
  }
`
export const GET_ENROLLED_USER_FIELDS = gql`
  fragment GetEnrolledUserFields on course_enrollment {
    user {
      id
      email
      name_first
      name_last
      custom_fields
    }
    id
    status
    created_at
    updated_at
  }
`
export const GET_ENROLLED_USER = gql`
  query GetEnrolledUser($courseId: Int!) {
    enrollments: course_enrollment(
      where: {
        course_id: { _eq: $courseId }
        status: { _eq: "active" }
        user: { status: { _eq: "active" } }
      }
    ) {
      ...GetEnrolledUserFields
    }
  }
`
