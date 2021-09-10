/**
 * Components - Users - Queries
 */

// Apollo
import { gql } from '@apollo/client'

import { ACCOUNT_FIELDS, ACCOUNT_USER_FIELDS } from '../accounts/queries'

export const USER_FIELDS = gql`
  fragment UserFields on user {
    id
    email
    status
    name_first
    name_last
    custom_fields
    is_verified
    created_at
    updated_at
  }
`

export const GET_USER = gql`
  query GetUser($userId: Int!) {
    user: user_by_pk(id: $userId) {
      ...UserFields
      account_users {
        ...AccountUserFields
        account {
          ...AccountFields
        }
      }
    }
  }
  ${ACCOUNT_FIELDS}
  ${ACCOUNT_USER_FIELDS}
  ${USER_FIELDS}
`

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: Int!, $changes: user_set_input) {
    update_user_by_pk(pk_columns: { id: $userId }, _set: $changes) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`
