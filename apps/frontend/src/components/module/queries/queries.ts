/**
 *  Components - ModuleS - Query
 */

// Apollo
import { gql } from '@apollo/client'

// Fragments
import { MODULE_FIELDS } from './fragments'
import { LESSON_FIELDS } from '../../lessons/queries/fragments'

export const GET_MODULES = gql`
  query GetModule(
    $limit: Int = 100
    $order_by: [module_order_by!] = { ordering: asc_nulls_last }
    $where: module_bool_exp
  ) {
    module: module(where: $where, limit: $limit, order_by: $order_by) {
      ...ModuleFields
      lessons(order_by: { ordering: asc_nulls_last }) {
        ...LessonFields
      }
    }
  }
  ${MODULE_FIELDS}
  ${LESSON_FIELDS}
`

export const CREATE_MODULE = gql`
  mutation CreateModule($objects: [module_insert_input!]!) {
    module: insert_module(objects: $objects) {
      returning {
        ...ModuleFields
        lessons {
          ...LessonFields
        }
      }
    }
  }
  ${MODULE_FIELDS}
  ${LESSON_FIELDS}
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

export const SWAP_MODULES = gql`
  mutation SwapModules($downId: Int!, $downOrdering: Int!, $upId: Int!, $upOrdering: Int!) {
    down: update_module(where: { id: { _eq: $downId } }, _set: { ordering: $downOrdering }) {
      returning {
        ...ModuleFields
      }
    }
    up: update_module(where: { id: { _eq: $upId } }, _set: { ordering: $upOrdering }) {
      returning {
        ...ModuleFields
      }
    }
  }
  ${MODULE_FIELDS}
`
