/**
 * Components - Users - Queries
 */

// Apollo
import { gql } from '@apollo/client'

import { ACCOUNT_FIELDS, ACCOUNT_USER_FIELDS } from '../accounts/queries/fragments'

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

export const GET_USER = gql`
  query GetUser($userId: Int!) {
    user: user_by_pk(id: $userId) {
      ...UserFields
      accounts {
        ...AccountUserFields
        account {
          ...AccountFields
        }
      }
    }
  }
  ${USER_FIELDS}
  ${ACCOUNT_FIELDS}
  ${ACCOUNT_USER_FIELDS}
`

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: Int!, $changes: user_set_input) {
    update_user_by_pk(pk_columns: { id: $userId }, _set: $changes) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`
