/**
 * Components - Addresss - Queries
 */

// Apollo
import { gql } from '@apollo/client'

// Fragments
import { ADDRESS_FIELDS } from './fragments'

export const GET_ADDRESSES = gql`
  query GetAddresses(
    $limit: Int = 100
    $order_by: [address_order_by!] = {}
    $where: address_bool_exp
  ) {
    address(where: $where, limit: $limit, order_by: $order_by) {
      ...AddressFields
    }
  }
  ${ADDRESS_FIELDS}
`

export const UPDATE_ADDRESS_BY_PK = gql`
  mutation UpdateAddressByPK($id: Int!, $changes: address_set_input = {}) {
    update_address_by_pk(pk_columns: { id: $id }, _set: $changes) {
      ...AddressFields
    }
  }
  ${ADDRESS_FIELDS}
`

export const DELETE_ADDRESS_BY_PK = gql`
  mutation DeleteAddressByPK($id: Int!) {
    delete_address_by_pk(id: $id) {
      ...AddressFields
    }
  }
  ${ADDRESS_FIELDS}
`

export const INSERT_ADDRESS_ONE = gql`
  mutation InsertAddressOne(
    $entity: String!
    $entityId: Int!
    $name: String
    $line1: String
    $line2: String
    $line3: String
    $city: String
    $postcode: String
    $county: String
    $status: String
    $metaType: String
  ) {
    insert_address_one(
      object: {
        entity: $entity
        entity_id: $entityId
        name: $name
        line1: $line1
        line2: $line2
        line3: $line3
        city: $city
        postcode: $postcode
        county: $county
        status: $status
        meta: { type: $metaType }
      }
    ) {
      ...AddressFields
    }
  }
  ${ADDRESS_FIELDS}
`
