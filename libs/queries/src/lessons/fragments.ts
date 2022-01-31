/**
 *  Components - Lessons - Queries - Fragments
 */

// Apollo
import { gql } from '@apollo/client'

export const LESSON_FIELDS = gql`
  fragment LessonFields on lesson {
    id
    course_id
    description
    content
    title
    type
    status
    ordering
    module_id
    custom_fields
    created_at
    updated_at
  }
`
