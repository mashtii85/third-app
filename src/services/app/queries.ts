/**
 * Services - App - Queries
 */

// Apollo
import { gql } from '@apollo/client'

export const APP_SETTINGS = gql`
  query AppSettings($client_id: Int!) {
    client_config
    client_taxonomies
    client_theme
    settings
  }
`
