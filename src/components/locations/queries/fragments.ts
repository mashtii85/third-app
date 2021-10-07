/**
 *  Components - Locations - Queries - Fragments
 */

// Apollo
import { gql } from '@apollo/client'

export const LOCATION_FIELDS = gql`
  fragment LocationFields on location {
    id
    name
    status
    created_at
    custom_fields
  }
`
