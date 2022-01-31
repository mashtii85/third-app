/**
 *  Components - Posts - Queries
 */

// Apollo
import { gql } from '@apollo/client'

// Fragments
import { POST_FIELDS } from './fragments'
import { MEDIA_FIELDS } from '../media/fragments'

export const GET_POSTS = gql`
  query GetPost($where: post_bool_exp) {
    posts: post(where: $where) {
      ...PostFields
      media(order_by: { id: desc }, limit: 1) {
        ...MediaFields
      }
    }
  }
  ${POST_FIELDS}
  ${MEDIA_FIELDS}
`

export const CREATE_POSTS = gql`
  mutation CreatePost($objects: [post_insert_input!]!) {
    posts: insert_post(objects: $objects) {
      returning {
        ...PostFields
        media(order_by: { id: desc }, limit: 1) {
          ...MediaFields
        }
      }
    }
  }
  ${POST_FIELDS}
  ${MEDIA_FIELDS}
`

export const UPDATE_POST_BY_PK = gql`
  mutation UpdatePost($id: Int!, $changes: post_set_input) {
    post: update_post_by_pk(pk_columns: { id: $id }, _set: $changes) {
      ...PostFields
      media(order_by: { id: desc }, limit: 1) {
        ...MediaFields
      }
    }
  }
  ${POST_FIELDS}
  ${MEDIA_FIELDS}
`

export const DELETE_POST_BY_PK = gql`
  mutation DeletePost($id: Int!) {
    post: delete_post_by_pk(id: $id) {
      ...PostFields
    }
  }
  ${POST_FIELDS}
`
