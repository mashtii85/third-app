/**
 * Components - Users - Queries - Queries
 */

// Apollo
import { gql } from '@apollo/client'

import { ACCOUNT_FIELDS, ACCOUNT_USER_FIELDS } from '../../accounts/queries/fragments'
import { USER_FIELDS } from './fragments'

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

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    user(where: { email: { _eq: $email } }) {
      ...UserFields
      password
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
    user: update_user_by_pk(pk_columns: { id: $userId }, _set: $changes) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`

export const GET_USERS = gql`
  query GetUsers(
    $limit: Int!
    $where: user_bool_exp = {}
    $offset: Int!
    $order_by: [user_order_by!] = {}
  ) {
    users: user(where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`

export const DELETE_USER_ACCOUNT_BY_USERID = gql`
  mutation deleteAccountUser($userId: Int!) {
    users: delete_account_user(where: { user_id: { _eq: $userId } }) {
      returning {
        user {
          ...UserFields
        }
      }
    }
  }
  ${USER_FIELDS}
`

export const CREATE_USER = gql`
  mutation createUser($object: user_insert_input!) {
    user: insert_user_one(object: $object) {
      ...UserFields
    }
  }
  ${USER_FIELDS}
`
