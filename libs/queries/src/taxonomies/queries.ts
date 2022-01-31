/**
 *  Components - Categories - Queries - Queries
 */

// Apollo
import { gql } from '@apollo/client'
import { MEDIA_FIELDS } from '../media/fragments'
import { TAXONOMY_FIELDS } from './fragments'

export const GET_TAXONOMIES = gql`
  query GetTaxonomy($where: taxonomy_bool_exp) {
    taxonomies: taxonomy(where: $where) {
      ...TaxonomyFields
      taxonomies {
        ...TaxonomyFields
      }
    }
  }
  ${TAXONOMY_FIELDS}
`

export const CREATE_TAXONOMY = gql`
  mutation CreateTaxonomy($objects: [taxonomy_insert_input!]!) {
    taxonomies: insert_taxonomy(objects: $objects) {
      returning {
        ...TaxonomyFields
        taxonomies {
          ...TaxonomyFields
        }
      }
    }
  }
  ${TAXONOMY_FIELDS}
`

export const UPDATE_TAXONOMY = gql`
  mutation UpdateTaxonomy($taxonomyId: Int!, $changes: taxonomy_set_input) {
    update_taxonomy_by_pk(pk_columns: { id: $taxonomyId }, _set: $changes) {
      ...TaxonomyFields
      taxonomies {
        ...TaxonomyFields
      }
      media {
        ...MediaFields
      }
    }
  }
  ${TAXONOMY_FIELDS}
  ${MEDIA_FIELDS}
`

export const DELETE_TAXONOMY = gql`
  mutation DeleteTaxonomy($taxonomyId: Int!) {
    taxonomy: delete_taxonomy_by_pk(id: $taxonomyId) {
      ...TaxonomyFields
    }
  }
  ${TAXONOMY_FIELDS}
`
export const DELETE_TAXONOMIES = gql`
  mutation DeleteTaxonomies($where: taxonomy_bool_exp!) {
    taxonomies: delete_taxonomy(where: $where) {
      ...TaxonomyFields
    }
  }
  ${TAXONOMY_FIELDS}
`
