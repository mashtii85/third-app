/**
 * Fragments - Accounts
 */

// Apollo
import { gql } from '@apollo/client'

export const ACCOUNT_FIELDS = gql`
  fragment AccountFields on account {
    id
    client_id
    taxonomy_id
    type
    name
    custom_fields
    meta
    status
    created_at
    updated_at
  }
`

export const ACCOUNT_USER_FIELDS = gql`
  fragment AccountUserFields on account_user {
    id
    account_id
    user_id
    is_owner
    is_contact
    last_signin_at
    custom_fields
    meta
    status
    created_at
    updated_at
  }
`
