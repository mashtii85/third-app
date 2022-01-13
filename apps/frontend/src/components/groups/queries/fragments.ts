/**
 *  Components - Groups - Queries - Fragments
 */

// Apollo
import { gql } from '@apollo/client'

export const GROUP_FIELDS = gql`
  fragment GroupFields on group {
    id
    account_id
    taxonomy_id
    name
    description
    created_at
    updated_at
    status
  }
`
