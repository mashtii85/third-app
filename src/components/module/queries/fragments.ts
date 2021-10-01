/**
 *  Components - Modules - Queries - Fragments
 */

// Apollo
import { gql } from '@apollo/client'

export const MODULE_FIELDS = gql`
  fragment ModuleFields on module {
    id
    course_id
    taxonomy_id
    title
    description
    ordering
    status
  }
`
