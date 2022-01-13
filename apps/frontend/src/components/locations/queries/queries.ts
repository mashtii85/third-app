/**
 *  Components - Locations - Queries - Queries
 */

// Apollo
import { gql } from '@apollo/client'
import { TAXONOMY_FIELDS } from '../../taxonomies/queries/fragments'
import { LOCATION_FIELDS } from './fragments'

export const GET_LOCATIONS = gql`
  query GetLocations(
    $limit: Int!
    $offset: Int!
    $order_by: [location_order_by!] = {}
    $where: location_bool_exp
  ) {
    locations: location(where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
      ...LocationFields
      taxonomy {
        ...TaxonomyFields
      }
    }
  }
  ${LOCATION_FIELDS}
  ${TAXONOMY_FIELDS}
`

export const CREATE_LOCATION = gql`
  mutation createLocation($object: location_insert_input!) {
    location: insert_location_one(object: $object) {
      ...LocationFields
      taxonomy {
        ...TaxonomyFields
      }
    }
  }
  ${LOCATION_FIELDS}
  ${TAXONOMY_FIELDS}
`

export const UPDATE_LOCATION = gql`
  mutation updateLocation($locationId: Int!, $set: location_set_input = {}) {
    location: update_location_by_pk(pk_columns: { id: $locationId }, _set: $set) {
      ...LocationFields
      taxonomy {
        ...TaxonomyFields
      }
    }
  }
  ${LOCATION_FIELDS}
  ${TAXONOMY_FIELDS}
`

export const DELETE_LOCATION = gql`
  mutation deleteLocation($locationId: Int!) {
    location: delete_location_by_pk(id: $locationId) {
      ...LocationFields
      taxonomy {
        ...TaxonomyFields
      }
    }
  }
  ${LOCATION_FIELDS}
  ${TAXONOMY_FIELDS}
`
