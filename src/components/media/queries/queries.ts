/**
 *  Components - Media - Query
 */

// Apollo
import { gql } from '@apollo/client'

// Fragments
import { MEDIA_FIELDS } from './fragments'

export const GET_MEDIA = gql`
  query GetMedium($limit: Int = 100, $order_by: [medium_order_by!] = {}, $where: medium_bool_exp) {
    media: medium(where: $where, limit: $limit, order_by: $order_by) {
      ...MediaFields
    }
  }
  ${MEDIA_FIELDS}
`

export const CREATE_MEDIUM = gql`
  mutation CreateMedium($objects: [medium_insert_input!]!) {
    media: insert_medium(objects: $objects) {
      returning {
        ...MediaFields
      }
    }
  }
  ${MEDIA_FIELDS}
`

export const UPDATE_MEDIUM_BY_PK = gql`
  mutation UpdateMedium($mediumId: Int!, $changes: medium_set_input) {
    media: update_medium_by_pk(pk_columns: { id: $mediumId }, _set: $changes) {
      ...MediaFields
    }
  }
  ${MEDIA_FIELDS}
`

export const DELETE_MEDIUM_BY_PK = gql`
  mutation DeleteMedium($id: Int!) {
    media: delete_medium_by_pk(id: $id) {
      ...MediaFields
    }
  }
  ${MEDIA_FIELDS}
`
