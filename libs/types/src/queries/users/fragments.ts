/**
 * Queries - User - Fragments
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
    email_verified
    phone
    phone_verified
    created_at
    updated_at
    meta
  }
`
