/**
 *  Components - Courses - Queries - Queries
 */

// Apollo
import { gql } from '@apollo/client'
import { COURSE_FIELDS } from './fragments'
import {
  COURSE_ENROLLMENT_AGGREGATE_FIELDS,
  ENROLLMENTS_FIELDS
} from '../../enrollments/queries/fragments'
import { MEDIA_FIELDS } from '../../media/queries/fragments'
import { LESSON_FIELDS } from '../../lessons/queries/fragments'

export const GET_COURSES = gql`
  query GetCourses($limit: Int = 100, $order_by: [course_order_by!] = {}, $where: course_bool_exp) {
    courses: course(where: $where, limit: $limit, order_by: $order_by) {
      ...CourseFields
      enrolled: course_enrollments_aggregate {
        ...EnrollmentsAggregateFields
      }
    }
  }
  ${COURSE_FIELDS}
  ${COURSE_ENROLLMENT_AGGREGATE_FIELDS}
`

export const GET_COURSE = gql`
  query GetCourse($courseId: Int!) {
    course: course_by_pk(id: $courseId) {
      ...CourseFields
      modules {
        id
        description
        created_at
        ordering
        status
        title
        updated_at
        course_id
        lessons {
          ...LessonFields
          lesson_progresses {
            id
            status
            updated_at
            lesson {
              id
              module {
                id
              }
            }
          }
          media {
            ...MediaFields
          }
        }
      }
      media {
        ...MediaFields
      }
      course_enrollments {
        ...EnrollmentFields
      }
    }
  }
  ${COURSE_FIELDS}
  ${LESSON_FIELDS}
  ${MEDIA_FIELDS}
  ${ENROLLMENTS_FIELDS}
`

export const CREATE_COURSE = gql`
  mutation CreateCourse(
    $clientId: Int!
    $accountId: Int!
    $status: String!
    $title: String!
    $description: String!
  ) {
    course: insert_course_one(
      object: {
        client_id: $clientId
        account_id: $accountId
        status: $status
        title: $title
        description: $description
      }
    ) {
      ...CourseFields
      enrolled: course_enrollments_aggregate {
        ...EnrollmentsAggregateFields
      }
    }
  }
  ${COURSE_FIELDS}
  ${COURSE_ENROLLMENT_AGGREGATE_FIELDS}
`
