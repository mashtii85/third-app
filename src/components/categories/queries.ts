/**
 *  Components - Taxonomy - Query
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

export const GET_TAXONOMIES = gql`
  query GetTaxonomy($where: taxonomy_bool_exp) {
    taxonomies: taxonomy(where: $where) {
      ...TaxonomyFields
    }
  }
  ${TAXONOMY_FIELDS}
`

export const CREATE_TAXONOMY = gql`
  mutation CreateTaxonomy($objects: [taxonomy_insert_input!]!) {
    insert_taxonomy(objects: $objects) {
      returning {
        ...TaxonomyFields
      }
    }
  }
  ${TAXONOMY_FIELDS}
`

export const UPDATE_TAXONOMY = gql`
  mutation UpdateTaxonomy($taxonomyId: Int!, $changes: taxonomy_set_input) {
    update_taxonomy_by_pk(pk_columns: { id: $taxonomyId }, _set: $changes) {
      ...TaxonomyFields
    }
  }
  ${TAXONOMY_FIELDS}
`

export const DELETE_TAXONOMY = gql`
  mutation DeleteTaxonomy($taxonomyId: Int!) {
    delete_taxonomy_by_pk(id: $taxonomyId) {
      ...TaxonomyFields
    }
  }
  ${TAXONOMY_FIELDS}
`
