/**
 * Queries - Settings - Queries
 */

// Apollo
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
      media(
        where: { entity: { _eq: "account" }, category: { _eq: "logo" } }
        limit: 1
        order_by: { created_at: desc }
      ) {
        id
        filename
      }
    }
    taxonomies: taxonomy(
      where: {
        client_id: { _eq: $clientId }
        type: { _in: ["courses", "clients", "events", "locations", "members"] }
        parent_id: { _is_null: true }
      }
    ) @include(if: $includeClient) {
      id
      name
      type
    }
  }
`
