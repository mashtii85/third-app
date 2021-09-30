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

export const CREATE_ADDRESS = gql`
  mutation CreateAddress($objects: [address_insert_input!]!) {
    addresses: insert_address(objects: $objects) {
      returning {
        ...AddressFields
      }
    }
  }
  ${ADDRESS_FIELDS}
`
