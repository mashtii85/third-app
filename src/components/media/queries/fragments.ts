/**
 *  Components - Courses - Queries - Fragments
 */

// Apollo
import { gql } from '@apollo/client'

export const MEDIA_FIELDS = gql`
  fragment MediaFields on medium {
    id
    caption
    category
    created_at
    entity
    entity_id
    extension
    filename
    status
    type
  }
`
