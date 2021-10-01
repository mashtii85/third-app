/**
 *  Components - ModuleS - Query
 */

// Apollo
import { gql } from '@apollo/client'

// Fragments
import { MODULE_FIELDS } from './fragments'

export const GET_MODULES = gql`
  query GetModule($where: module_bool_exp) {
    module: module(where: $where) {
      ...ModuleFields
    }
  }
  ${MODULE_FIELDS}
`

export const CREATE_MODULE = gql`
  mutation CreateModule($objects: [module_insert_input!]!) {
    module: insert_module(objects: $objects) {
      returning {
        ...ModuleFields
      }
    }
  }
  ${MODULE_FIELDS}
`

export const UPDATE_MODULE_BY_PK = gql`
  mutation UpdateModule($id: Int!, $changes: module_set_input) {
    module: update_module_by_pk(pk_columns: { id: $id }, _set: $changes) {
      ...ModuleFields
    }
  }
  ${MODULE_FIELDS}
`

export const DELETE_MODULE_BY_PK = gql`
  mutation DeleteModule($id: Int!) {
    module: delete_module_by_pk(id: $id) {
      ...ModuleFields
    }
  }
  ${MODULE_FIELDS}
`
