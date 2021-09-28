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
import { TAXONOMY_FIELDS } from '../../categories/queries'
import { MEDIA_FIELDS } from '../../media/queries/fragments'
import { LESSON_FIELDS } from '../../lessons/queries/fragments'

export const GET_COURSES = gql`
  query GetCourses($limit: Int = 100, $order_by: [course_order_by!] = {}, $where: course_bool_exp) {
    courses: course(where: $where, limit: $limit, order_by: $order_by) {
      ...CourseFields
      taxonomy {
        ...TaxonomyFields
      }
      enrolled: course_enrollments_aggregate {
        ...EnrollmentsAggregateFields
      }
    }
  }
  ${COURSE_FIELDS}
  ${TAXONOMY_FIELDS}
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
          questions: taxonomies(
            where: { type: { _eq: "lesson-questions" }, entity: { _eq: "lesson" } }
          ) {
            id
            name
            meta
            status
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
    $accountId: Int!
    $status: String!
    $title: String!
    $description: String!
    $taxonomy_id: Int
  ) {
    course: insert_course_one(
      object: {
        account_id: $accountId
        status: $status
        title: $title
        description: $description
        taxonomy_id: $taxonomy_id
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

export const UPDATE_COURSE = gql`
  mutation updateCourse($courseId: Int!, $set: course_set_input = {}) {
    course: update_course_by_pk(pk_columns: { id: $courseId }, _set: $set) {
      ...CourseFields
      enrolled: course_enrollments_aggregate {
        ...EnrollmentsAggregateFields
      }
    }
  }
  ${COURSE_FIELDS}
  ${COURSE_ENROLLMENT_AGGREGATE_FIELDS}
`

export const DELETE_COURSE = gql`
  mutation deleteCourse($courseId: Int!) {
    course: delete_course_by_pk(id: $courseId) {
      ...CourseFields
      enrolled: course_enrollments_aggregate {
        ...EnrollmentsAggregateFields
      }
    }
  }
  ${COURSE_FIELDS}
  ${COURSE_ENROLLMENT_AGGREGATE_FIELDS}
`
