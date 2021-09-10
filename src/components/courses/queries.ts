/**
 *  Components - Courses - Queries
 */

// Apollo
import { gql } from '@apollo/client'

export const GET_COURSES_FIELDS = gql`
  fragment GetCoursesFields111 on course {
    id
    title
    description
    customFields: custom_fields
    enrolled: course_enrollments_aggregate {
      aggregate {
        count
      }
    }
  }
`

export const GET_COURSES = gql`
  query GetCourses($limit: Int = 100, $order_by: [course_order_by!] = {}, $where: course_bool_exp) {
    courses: course(where: $where, limit: $limit, order_by: $order_by) {
      id
      title
      description
      customFields: custom_fields
      enrolled: course_enrollments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
`

export const GET_COURSE_FIELDS = gql`
  fragment GetCourseFields on course {
    id
    account_id
    description
    title
    status
    updated_at
    created_at
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
`

export const GET_COURSE = gql`
  query GetCourse($courseId: Int!) {
    course: course_by_pk(id: $courseId) {
      ...GetCourseFields
    }
  }
`

export const CREATE_COURSE_FIELDS = gql`
  fragment CreateCourseOne on insert_course_one {
    title
    id
    description
    customFields: custom_fields
    enrolled: course_enrollments_aggregate {
      aggregate {
        count
      }
    }
  }
`
export const CREATE_COURSE = gql`
  mutation CreateCourse(
    $clientId: Int!
    $accountId: Int!
    $status: String!
    $title: String!
    $description: String!
  ) {
    insert_course_one(
      object: {
        client_id: $clientId
        account_id: $accountId
        status: $status
        title: $title
        description: $description
      }
    ) {
      title
      id
      description
      customFields: custom_fields
      enrolled: course_enrollments_aggregate {
        aggregate {
          count
        }
      }
    }
  }
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
