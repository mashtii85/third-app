// Apollo
import { gql } from '@apollo/client'

import { ACCOUNT_FIELDS } from './fragments'
import { USER_FIELDS } from '../users/fragments'
import { TAXONOMY_FIELDS } from '../taxonomies/fragments'

export const GET_ACCOUNTS = gql`
  query GetAccounts(
    $where: account_bool_exp
    $limit: Int
    $offset: Int
    $order_by: [account_order_by!] = { updated_at: desc, created_at: asc }
  ) {
    accounts: account(where: $where, order_by: $order_by, limit: $limit, offset: $offset) {
      ...AccountFields
      taxonomy {
        ...TaxonomyFields
      }
      users(limit: 1) {
        id
        status
        user {
          ...UserFields
        }
      }
    }
  }
  ${TAXONOMY_FIELDS}
  ${ACCOUNT_FIELDS}
  ${USER_FIELDS}
`

export const GET_ACCOUNT = gql`
  query GetAccount($accountId: Int!) {
    account: account_by_pk(id: $accountId) {
      ...AccountFields
      users(limit: 1) {
        id
        status
        user {
          ...UserFields
        }
      }
    }
  }
  ${ACCOUNT_FIELDS}
  ${USER_FIELDS}
`

export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($object: account_insert_input!) {
    account: insert_account_one(object: $object) {
      ...AccountFields
      taxonomy {
        ...TaxonomyFields
      }
      users(limit: 1) {
        id
        status
        user {
          ...UserFields
        }
      }
    }
  }
  ${TAXONOMY_FIELDS}
  ${ACCOUNT_FIELDS}
  ${USER_FIELDS}
`

export const UPDATE_ACCOUNT_USER = gql`
  mutation UpdateAccount(
    $accountSet: account_set_input = {}
    $accountId: Int!
    $userObject: [user_insert_input!] = {}
    $hasUser: Boolean!
  ) {
    user: insert_user(objects: $userObject) @include(if: $hasUser) {
      returning {
        ...UserFields
      }
    }
    account: update_account_by_pk(pk_columns: { id: $accountId }, _set: $accountSet) {
      ...AccountFields
      taxonomy {
        ...TaxonomyFields
      }
      users(limit: 1) {
        id
        status
        user {
          ...UserFields
        }
      }
    }
  }
  ${TAXONOMY_FIELDS}
  ${ACCOUNT_FIELDS}
  ${USER_FIELDS}
`

export const DELETE_ACCOUNT_BY_ID = gql`
  mutation deleteAccountById($accountId: Int!) {
    account: delete_account_by_pk(id: $accountId) {
      ...AccountFields
      taxonomy {
        ...TaxonomyFields
      }
    }
  }
  ${ACCOUNT_FIELDS}
  ${TAXONOMY_FIELDS}
`
