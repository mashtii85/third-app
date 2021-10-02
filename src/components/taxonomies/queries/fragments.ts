/**
 *  Components - Taxonomies - Queries - Fragments
 */

// Apollo
import { gql } from '@apollo/client'

export const TAXONOMY_FIELDS = gql`
  fragment TaxonomyFields on taxonomy {
    entity
    name
    id
    type
    status
    custom_fields
  }
`
