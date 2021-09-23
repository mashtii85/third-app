/**
 *  Components - Courses - Queries - Fragments
 */

// Apollo
import { gql } from '@apollo/client'

export const COURSE_FIELDS = gql`
  fragment CourseFields on course {
    id
    title
    account_id
    description
    custom_fields
    taxonomy_id
    status
    created_at
  }
`
