/**
 *  Components - Taxonomy - Query
 */

// Apollo
import { gql } from '@apollo/client'

export const GET_TAXONOMIES = gql`
  query GetTaxonomy($category: String!) {
    taxonomy(where: { type: { _eq: $category } }) {
      entity
      name
      id
      type
      status
    }
  }
`

export const ADD_TAXONOMY = gql`
  mutation AddTaxonomy($objects: [taxonomy_insert_input!]!) {
    insert_taxonomy(objects: $objects) {
      returning {
        id
        type
      }
    }
  }
`
