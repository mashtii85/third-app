/**
 * Components - Users - Queries - Fragments
 */
// Apollo
import { gql } from '@apollo/client'

export const USER_FIELDS = gql`
  fragment UserFields on user {
    id
    email
    status
    name_first
    name_last
    custom_fields
    meta
    is_verified
    created_at
    updated_at
  }
`
