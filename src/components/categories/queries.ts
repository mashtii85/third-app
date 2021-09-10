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

export const UPDATE_TAXONOMY = gql`
  mutation UpdateTaxonomy($taxonomyId: Int!, $changes: taxonomy_set_input) {
    update_taxonomy_by_pk(pk_columns: { id: $taxonomyId }, _set: $changes) {
      id
    }
  }
`

export const DELETE_TAXONOMY = gql`
  mutation DeleteTaxonomy($taxonomyId: Int!) {
    delete_taxonomy_by_pk(id: $taxonomyId) {
      id
    }
  }
`
