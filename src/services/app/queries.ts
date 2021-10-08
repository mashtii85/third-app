/**
 * Services - App - Queries
 */

// Apollo
import { gql } from '@apollo/client'

export const GET_APP_SETTINGS = gql`
  query GetAppSettings($client_id: Int!) {
    settings: setting {
      id
      value
    }
    client: account_by_pk(id: $client_id) {
      id
      name
      type
      meta
    }
  }
`
