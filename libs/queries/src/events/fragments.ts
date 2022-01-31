/**
 *  Components - Events - Queries - Fragments
 */

// Apollo
import { gql } from '@apollo/client'

export const EVENT_FIELDS = gql`
  fragment EventFields on event {
    id
    created_at
    custom_fields
    description
    status
    start_at
    end_at
    location_id
    taxonomy_id
    title
  }
`
