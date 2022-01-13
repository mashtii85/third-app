/**
 *  Components - GroupEntities - Queries - Queries
 */

// Apollo
import { gql } from '@apollo/client'
import { GROUP_FIELDS } from '../../groups/queries/fragments'

// Fragments
import { GROUP_ENTITY_FIELDS } from './fragments'

export const GET_GROUP_ENTITIES = gql`
  query GroupEntities($where: group_entity_bool_exp = {}) {
    groupEntities: group_entity(where: $where) {
      ...GroupEntityFields
      group {
        ...GroupFields
      }
    }
  }
  ${GROUP_ENTITY_FIELDS}
  ${GROUP_FIELDS}
`

export const CREATE_GROUP_ENTITY = gql`
  mutation createGroupEntity($objects: [group_entity_insert_input!]!) {
    groupEntities: insert_group_entity(objects: $objects) {
      returning {
        ...GroupEntityFields
        group {
          ...GroupFields
        }
      }
    }
  }
  ${GROUP_ENTITY_FIELDS}
  ${GROUP_FIELDS}
`

export const DELETE_GROUP_ENTITY_BY_PK = gql`
  mutation DeleteGroupEntity($id: Int!) {
    groupEntity: delete_group_entity_by_pk(id: $id) {
      ...GroupEntityFields
      group {
        ...GroupFields
      }
    }
  }
  ${GROUP_ENTITY_FIELDS}
  ${GROUP_FIELDS}
`
