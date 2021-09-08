/**
 * Components - Users - Query
 */

// Apollo
import { gql } from '@apollo/client'

export const GET_USER = gql`
  query GetUser($userId: Int!) {
    user: user_by_pk(id: $userId) {
      id
      email
      status
      name_first
      name_last
      is_verified
      created_at
      updated_at
      account_users {
        id
        account_id
        is_contact
        is_owner
        status
        user_id
        account {
          id
          type
          structure
          status
          name
          created_at
        }
      }
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($userId: Int!, $changes: user_set_input) {
    update_user_by_pk(pk_columns: { id: $userId }, _set: $changes) {
      id
    }
  }
`
