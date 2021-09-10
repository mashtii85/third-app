/**
 *  Components - Enrollments - queries
 */

// Apollo
import { gql } from '@apollo/client'
import { ENROLLMENTS_FIELDS } from './fragments'
import { COURSE_FIELDS } from '../../courses/queries/fragments'

export const GET_ENROLLMENTS = gql`
  query GetEnrollments($userId: Int!) {
    enrollments: course_enrollment(where: { user_id: { _eq: $userId } }) {
      ...EnrollmentFields
      course {
        ...CourseFields
        media(limit: 1) {
          filename
        }
      }
    }
  }
  ${ENROLLMENTS_FIELDS}
  ${COURSE_FIELDS}
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
      user {
        id
        email
        name_first
        name_last
        custom_fields
      }
      ...EnrollmentFields
    }
  }
  ${ENROLLMENTS_FIELDS}
`
