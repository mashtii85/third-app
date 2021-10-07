/**
 *  Components - Enrollments - queries
 */

import { COURSE_FIELDS } from '../../courses/queries/fragments'
import { ENROLLMENTS_FIELDS } from './fragments'
import { USER_FIELDS } from '../../users/queries'
// Apollo
import { gql } from '@apollo/client'

// export const GET_ENROLLMENTS = gql`
//   query GetEnrollments(
//     $where: course_enrollment_bool_exp
//     $limit: Int
//     $offset: Int = 20
//     $order_by: [course_enrollment_order_by!] = {}
//   ) {
//     enrollments: course_enrollment(
//       where: $where
//       limit: $limit
//       offset: $offset
//       order_by: $order_by
//     ) {
//       ...EnrollmentFields
//       course {
//         ...CourseFields
//         media(limit: 1) {
//           filename
//         }
//       }
//     }
//   }
//   ${ENROLLMENTS_FIELDS}
//   ${COURSE_FIELDS}
// `

export const GET_ENROLLMENTS = gql`
  query GetEnrollments($where: course_enrollment_bool_exp) {
    enrollments: course_enrollment(where: $where) {
      user {
        ...UserFields
      }
      course {
        ...CourseFields
        media(limit: 1) {
          filename
        }
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
  ${COURSE_FIELDS}
  ${USER_FIELDS}
`

export const INSERT_ENROLLMENT = gql`
  mutation InsertEnrollment($object: course_enrollment_insert_input!) {
    insert_course_enrollment_one(object: $object) {
      account_id
    }
  }
`

export const UPDATE_COURSE_ENROLLMENT_BY_PK = gql`
  mutation UpdateCourseEnrollmentById($id: Int!, $changes: course_enrollment_set_input) {
    update_course_enrollment_by_pk(pk_columns: { id: $id }, _set: $changes) {
      id
      course_id
      status
      updated_at
    }
  }
`
