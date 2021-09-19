/**
 * Components - Lessons - Queries
 */

// Apollo
import { gql } from '@apollo/client'

// Fragments
import { LESSON_FIELDS } from './fragments'

export const GET_LESSONS = gql`
  query GetLessons($limit: Int = 100, $order_by: [lesson_order_by!] = {}, $where: lesson_bool_exp) {
    lessons: lesson(where: $where, limit: $limit, order_by: $order_by) {
      ...LessonFields
    }
  }
  ${LESSON_FIELDS}
`

export const UPDATE_LESSON_STATUS = gql`
  mutation UpdateLesson($lessonId: Int!, $status: String) {
    update_lesson_by_pk(pk_columns: { id: $lessonId }, _set: { status: $status }) {
      id
    }
  }
`

export const CREATE_LESSON = gql`
  mutation CreateLesson(
    $client_id: Int!
    $course_id: Int!
    $module_id: Int!
    $title: String
    $description: String
    $type: String
    $content: String
    $status: String
    $ordering: Int
  ) {
    insert_lesson_one(
      object: {
        client_id: $client_id
        client_id: $client_id
        module_id: $module_id
        title: $title
        description: $description
        type: $type
        content: $content
        status: $status
        ordering: $ordering
      }
    ) {
      id
    }
  }
`

// should move to lesson progress
export const UPDATE_LESSON_PROGRESS_BY_PK = gql`
  mutation UpdateLessonProgress($id: Int!, $changes: lesson_progress_set_input) {
    update_lesson_progress_by_pk(pk_columns: { id: $id }, _set: $changes) {
      id
      updated_at
    }
  }
`

// should move to lesson progress
export const GET_LESSON_PROGRESS_BY_LESSONID = gql`
  query GetLessonProgressByLessonId($lessonId: Int!) {
    lesson_progress(where: { lesson_id: { _eq: $lessonId } }) {
      id
    }
  }
`

// should move to lesson progress
export const ADD_LESSON_PROGRESS_ONE = gql`
  mutation AddLessonProgress($enrollment_id: Int!, $lesson_id: Int!, $status: String) {
    insert_lesson_progress_one(
      object: { enrollment_id: $enrollment_id, lesson_id: $lesson_id, status: $status }
    ) {
      id
      status
      points
      created_at
    }
  }
`
