/**
 * Queries - User - Queries
 */

// Apollo
import { gql } from '@apollo/client'

// Fragments
import { ACCOUNT_FIELDS, ACCOUNT_USER_FIELDS, USER_FIELDS } from '../fragments'

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
