/**
 *  Components - GroupEntities - Queries - Fragments
 */

// Apollo
import { gql } from '@apollo/client'

export const GROUP_ENTITY_FIELDS = gql`
  fragment GroupEntityFields on group_entity {
    id
    group_id
    entity_id
    entity
    status
  }
`
