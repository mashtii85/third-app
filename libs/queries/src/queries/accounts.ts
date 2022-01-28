/**
 * Queries - Accounts - Queries
 */

// Apollo
import { gql } from '@apollo/client'

// Fragments
import { ACCOUNT_FIELDS, USER_FIELDS } from '../fragments'

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
