/**
 *  Components - Groups - Queries - Queries
 */

// Apollo
import { gql } from '@apollo/client'

// Fragments
import { GROUP_FIELDS } from './fragments'

export const GET_GROUPS = gql`
  query GetGroups($where: group_bool_exp) {
    groups: group(where: $where) {
      ...GroupFields
    }
  }
  ${GROUP_FIELDS}
`

export const GET_GROUPS_SELECT = gql`
  query GetGroups($where: group_bool_exp) {
    options: group(where: $where) {
      label: name
      value: id
    }
  }
  ${GROUP_FIELDS}
`

export const CREATE_GROUPS = gql`
  mutation CreateGroup($objects: [group_insert_input!]!) {
    groups: insert_group(objects: $objects) {
      returning {
        ...GroupFields
      }
    }
  }
  ${GROUP_FIELDS}
`

export const UPDATE_GROUP_BY_PK = gql`
  mutation UpdateGroup($id: Int!, $changes: group_set_input) {
    group: update_group_by_pk(pk_columns: { id: $id }, _set: $changes) {
      ...GroupFields
    }
  }
  ${GROUP_FIELDS}
`

export const DELETE_GROUP_BY_PK = gql`
  mutation DeleteGroup($id: Int!) {
    group: delete_group_by_pk(id: $id) {
      ...GroupFields
    }
  }
  ${GROUP_FIELDS}
`
