/**
 * Components - Course - Query
 */

// Apollo
import { gql } from '@apollo/client'

export const GET_COURSE = gql`
  query GetCourse($courseId: Int!) {
    course: course_by_pk(id: $courseId) {
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
          client_id
          lesson_progresses {
            id
            status
            updated_at
          }
        }
      }
      media {
        caption
        category
        created_at
        entity
        entity_id
        extension
        filename
        id
        status
        type
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

export const UPDATE_LESSON_PROGRESS_BY_PK = gql`
  mutation UpdateLessonProgress($id: Int!, $changes: lesson_progress_set_input) {
    update_lesson_progress_by_pk(pk_columns: { id: $id }, _set: $changes) {
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
