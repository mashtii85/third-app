// Apollo
import { gql } from '@apollo/client'

import { ACCOUNT_FIELDS } from './fragments'
import { USER_FIELDS } from '../../users/queries'

export const GET_ACCOUNTS = gql`
  query GetAccounts($clientId: Int!) {
    accounts: account_client(where: { client_id: { _eq: $clientId } }) {
      account {
        ...AccountFields
      }
    }
  }
  ${ACCOUNT_FIELDS}
`

export const GET_ACCOUNT = gql`
  query GetAccount($accountId: Int!) {
    account: account_by_pk(id: $accountId) {
      ...AccountFields
    }
  }
  ${ACCOUNT_FIELDS}
`
export const CREATE_ACCOUNT = gql`
  mutation CreateAccount($objects: [account_insert_input!]!) {
    insert_account(objects: $objects) {
      returning {
        ...AccountFields
      }
    }
  }
  ${ACCOUNT_FIELDS}
`

export const GET_ACCOUNT_USER = gql`
  query GetAccountUser($accountId: Int!) {
    users: account_user_by_pk(account_id: $accountId) {
      user {
        ...UserFields
      }
    }
  }
  ${USER_FIELDS}
`
