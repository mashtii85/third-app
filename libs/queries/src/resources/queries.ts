/**
 * Components - Courses - Resources - Queries
 */

// Apollo
import { gql } from '@apollo/client'

// Fragments
import { POST_FIELDS } from '../posts/fragments'
import { MEDIA_FIELDS } from '../media/fragments'

export const CREATE_RESOURCES = gql`
  mutation CreateMedium($objects: [medium_insert_input!]!) {
    post: insert_medium(objects: $objects) {
      returning {
        post {
          ...PostFields
          media {
            ...MediaFields
          }
        }
      }
    }
  }
  ${POST_FIELDS}
  ${MEDIA_FIELDS}
`
