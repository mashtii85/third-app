// Apollo
import { gql } from '@apollo/client'

import { ACCOUNT_FIELDS } from './fragments'
import { USER_FIELDS } from '../../users/queries'
import { TAXONOMY_FIELDS } from '../../categories/queries/fragments'
export const GET_ACCOUNTS = gql`
  query GetAccounts($where: account_bool_exp) {
    accounts: account(where: $where) {
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

export const GET_ACCOUNT_USER = gql`
  query GetAccountUser($accountId: Int!) {
    users: account_user_by_pk(account_id: $accountId) {
      id
      user {
        ...UserFields
      }
    }
  }
  ${USER_FIELDS}
`

export const UPDATE_ACCOUNT_USER = gql`
  mutation UpdateAccount(
    $accountSet: account_set_input = {}
    $accountId: Int!
    $userSet: user_set_input = {}
    $userId: Int!
  ) {
    account: update_account_by_pk(pk_columns: { id: $accountId }, _set: $accountSet) {
      ...AccountFields
    }
    user: update_user_by_pk(pk_columns: { id: $userId }, _set: $userSet) {
      ...UserFields
    }
  }
  ${ACCOUNT_FIELDS}
  ${USER_FIELDS}
`
