/**
 *  Components - Taxonomies - Queries - Fragments
 */

// Apollo
import { gql } from '@apollo/client'

export const TAXONOMY_FIELDS = gql`
  fragment TaxonomyFields on taxonomy {
    id
    entity
    entity_id
    name
    type
    status
    custom_fields
    meta
  }
`
