/**
 *  Components - Enrollments - queries
 */

// Apollo
import { gql } from '@apollo/client'
import { ENROLLMENTS_FIELDS } from './fragments'
import { COURSE_FIELDS } from '../../courses/queries/fragments'
import { USER_FIELDS } from '../../users/queries'

export const GET_ENROLLMENTS = gql`
  query GetEnrollments(
    $where: course_enrollment_bool_exp
    $limit: Int
    $offset: Int = 20
    $order_by: [course_enrollment_order_by!] = {}
  ) {
    enrollments: course_enrollment(
      where: $where
      limit: $limit
      offset: $offset
      order_by: $order_by
    ) {
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

// export const GET_ENROLLED_USER = gql`
//   query GetEnrolledUser($courseId: Int!) {
//     enrollments: course_enrollment(
//       where: {
//         course_id: { _eq: $courseId }
//         status: { _eq: "active" }
//         user: { status: { _eq: "active" } }
//       }
//     ) {
//       user {
//         id
//         email
//         name_first
//         name_last
//         custom_fields
//       }
//       ...EnrollmentFields
//     }
//   }
//   ${ENROLLMENTS_FIELDS}
// `

export const GET_ENROLLED_USERS = gql`
  query GetEnrolledUser($where: course_enrollment_bool_exp) {
    enrollments: course_enrollment(where: $where) {
      user {
        ...UserFields
      }
      course {
        title
        custom_fields
      }
      completed_lessons: lesson_progresses_aggregate(where: { status: { _eq: "completed" } }) {
        aggregate {
          count
        }
      }
      ...EnrollmentFields
    }
  }
  ${ENROLLMENTS_FIELDS}
  ${USER_FIELDS}
`

export const INSERT_ENROLLMENT = gql`
  mutation InsertEnrollment($object: course_enrollment_insert_input!) {
    insert_course_enrollment_one(object: $object) {
      account_id
    }
  }
`
