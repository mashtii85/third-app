/**
 *  Components - Addresss - Queries - Fragments
 */

// Apollo
import { gql } from '@apollo/client'

export const ADDRESS_FIELDS = gql`
  fragment AddressFields on address {
    id
    entity
    entity_id
    name
    line1
    line2
    line3
    city
    postcode
    county
    created_at
    updated_at
    status
    meta
  }
`
