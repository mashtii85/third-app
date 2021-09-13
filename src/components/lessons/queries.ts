/**
 * Components - Lessons - Queries
 */

// Apollo
import { gql } from '@apollo/client'

export const UPDATE_LESSON_STATUS = gql`
  mutation UpdateLesson($lessonId: Int!, $status: String) {
    update_lesson_by_pk(pk_columns: { id: $lessonId }, _set: { status: $status }) {
      id
    }
  }
`

export const UPDATE_LESSON_PROGRESS_BY_PK = gql`
  mutation UpdateLessonProgress($id: Int!, $changes: lesson_progress_set_input) {
    update_lesson_progress_by_pk(pk_columns: { id: $id }, _set: $changes) {
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
