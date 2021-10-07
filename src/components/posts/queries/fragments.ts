/**
 *  Components - Posts - Queries - Fragments
 */

// Apollo
import { gql } from '@apollo/client'

export const POST_FIELDS = gql`
  fragment PostFields on post {
    id
    account_id
    taxonomy_id
    entity_id
    entity
    title
    subtitle
    type
    content
    created_at
    updated_at
    publish_at
    expire_at
    status
  }
`
