/**
 * Services - Auth - Types
 */

// Types
import { ACCOUNT_TYPE, CurrentUser } from '..'

export interface LoginModel {
  token: string
  user: Partial<CurrentUser>
}

export interface LoginDataModel {
  'https://hasura.io/jwt/claims': {
    'x-hasura-allowed-roles': ACCOUNT_TYPE[]
    'x-hasura-default-role': ACCOUNT_TYPE
    'x-hasura-user-id': string
    'x-hasura-client-id': string
    'x-hasura-account-id': string
    'x-hasura-account-type': string
  }
  user: Partial<CurrentUser>
}
