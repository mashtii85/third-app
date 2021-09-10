/**
 *  Components - Courses - Queries - Queries
 */

// Apollo
import { gql } from '@apollo/client'
import { COURSE_FIELDS } from './fragments'
import { COURSE_AGGREGATE_FIELDS } from '../../enrollments/queries/fragments'

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
  ${COURSE_AGGREGATE_FIELDS}
`

export const GET_COURSE = gql`
  query GetCourse($courseId: Int!) {
    course: course_by_pk(id: $courseId) {
      ...COURSE_FIELDS
      modules {
        id
        description
        created_at
        status
        title
        ordering
        updated_at
        course_id
        lessons {
          id
          description
          created_at
          content
          title
          type
          status
          ordering
          module_id
          lesson_progresses {
            status
          }
        }
      }
    }
  }
  ${COURSE_FIELDS}
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
  ${COURSE_AGGREGATE_FIELDS}
`

export const UPDATE_LESSON_STATUS = gql`
  mutation UpdateLesson($lessonId: Int!, $status: String) {
    update_lesson_by_pk(pk_columns: { id: $lessonId }, _set: { status: $status }) {
      id
    }
  }
`

export const GET_LESSON_PROGRESS_BY_LESSONID = gql`
  query GetLessonProgressByLessonId($lessonId: Int!) {
    lesson_progress(where: { lesson_id: { _eq: $lessonId } }) {
      id
    }
  }
`

export const UPDATE_LESSON_PROGRESS_STATUS = gql`
  mutation UpdateLessonProgressStatus($id: Int!, $status: String) {
    update_lesson_progress_by_pk(pk_columns: { id: $id }, _set: { status: $status }) {
      id
    }
  }
`

export const UPDATE_LESSON_PROGRESS_BY_PK = gql`
  mutation UpdateLessonProgressStatus($id: Int!, $points: Int!, $status: String) {
    update_lesson_progress_by_pk(
      pk_columns: { id: $id }
      _set: { points: $points, status: $status }
    ) {
      id
    }
  }
`

export const ADD_LESSON_PROGRESS_ONE = gql`
  mutation AddLessonProgress(
    $client_id: Int!
    $enrollment_id: Int!
    $lesson_id: Int!
    $status: String
  ) {
    insert_lesson_progress_one(
      object: {
        client_id: $client_id
        enrollment_id: $enrollment_id
        lesson_id: $lesson_id
        status: $status
      }
    ) {
      id
      status
      points
      created_at
    }
  }
`
