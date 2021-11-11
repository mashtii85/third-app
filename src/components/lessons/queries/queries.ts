/**
 * Components - Lessons - Queries
 */

// Apollo
import { gql } from '@apollo/client'
import { MEDIA_FIELDS } from '../../media/queries/fragments'
import { TAXONOMY_FIELDS } from '../../taxonomies/queries/fragments'

// Fragments
import { LESSON_FIELDS } from './fragments'

export const GET_LESSONS = gql`
  query GetLessons($limit: Int = 100, $order_by: [lesson_order_by!] = {}, $where: lesson_bool_exp) {
    lessons: lesson(where: $where, limit: $limit, order_by: $order_by) {
      ...LessonFields
      taxonomies {
        ...TaxonomyFields
        media {
          ...MediaFields
        }
      }
      media {
        ...MediaFields
      }
    }
  }
  ${LESSON_FIELDS}
  ${TAXONOMY_FIELDS}
  ${MEDIA_FIELDS}
`

export const UPDATE_LESSON_BY_PK = gql`
  mutation UpdateLesson($id: Int!, $changes: lesson_set_input = {}) {
    update_lesson_by_pk(pk_columns: { id: $id }, _set: $changes) {
      ...LessonFields
    }
  }
  ${LESSON_FIELDS}
`

export const SWAP_LESSONS = gql`
  mutation SwapLessons($downId: Int!, $downOrdering: Int!, $upId: Int!, $upOrdering: Int!) {
    down: update_lesson(where: { id: { _eq: $downId } }, _set: { ordering: $downOrdering }) {
      returning {
        ...LessonFields
      }
    }
    up: update_lesson(where: { id: { _eq: $upId } }, _set: { ordering: $upOrdering }) {
      returning {
        ...LessonFields
      }
    }
  }
  ${LESSON_FIELDS}
`

export const DELETE_LESSON_BY_PK = gql`
  mutation DeleteLessonByPK($id: Int!) {
    delete_lesson_by_pk(id: $id) {
      id
      module_id
      course_id
    }
  }
`

export const INSERT_LESSON_ONE = gql`
  mutation CreateLesson(
    $courseId: Int!
    $moduleId: Int!
    $title: String
    $description: String
    $type: String
    $content: String
    $status: String
  ) {
    insert_lesson_one(
      object: {
        course_id: $courseId
        module_id: $moduleId
        title: $title
        description: $description
        type: $type
        content: $content
        status: $status
      }
    ) {
      ...LessonFields
    }
  }
  ${LESSON_FIELDS}
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
