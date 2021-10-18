/**
 * Settings - Queries
 */

// GraphQL
import { gql } from '@apollo/client'

export const GET_APP_SETTINGS = gql`
  query GetSettings($clientId: Int!, $includeClient: Boolean!) {
    settings: setting {
      id
      value
    }
    client: account_by_pk(id: $clientId) @include(if: $includeClient) {
      id
      name
      type
      meta
    }
    taxonomies: taxonomy(
      where: {
        client_id: { _eq: $clientId }
        type: { _in: ["courses", "clients", "events", "locations", "members"] }
      }
    ) @include(if: $includeClient) {
      id
      name
      type
    }
  }
`
