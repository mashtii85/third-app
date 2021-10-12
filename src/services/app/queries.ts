/**
 * Services - App - Queries
 */

// Apollo
import { gql } from '@apollo/client'

export const APP_SETTINGS = gql`
  query AppSettings($client_id: Int!) {
    appSettings: app_settings(client_id: $client_id) {
      config
      features
      taxonomies
      theme
      settings
    }
  }
`
