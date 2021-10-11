/**
 * Settings - Queries
 */

// GraphQL
import { gql } from '@apollo/client'

export const GET_APP_SETTINGS = gql`
  query GetSettings($client_id: Int!) {
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
    taxonomies: taxonomy(
      where: {
        client_id: { _eq: $client_id }
        type: { _in: ["courses", "clients", "events", "locations", "members"] }
      }
    ) {
      id
      name
      type
    }
  }
`
