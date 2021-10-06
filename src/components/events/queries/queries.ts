/**
 *  Components - Events - Queries - Queries
 */

// Apollo
import { gql } from '@apollo/client'
import { TAXONOMY_FIELDS } from '../../taxonomies/queries/fragments'
import { EVENT_FIELDS } from './fragments'

export const GET_EVENTS = gql`
  query GetEvents(
    $limit: Int!
    $offset: Int!
    $order_by: [event_order_by!] = {}
    $where: event_bool_exp
  ) {
    events: event(where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
      ...EventFields
      taxonomy {
        ...TaxonomyFields
      }
    }
  }
  ${EVENT_FIELDS}
  ${TAXONOMY_FIELDS}
`

export const CREATE_EVENT = gql`
  mutation createEvent($object: event_insert_input!) {
    event: insert_event_one(object: $object) {
      ...EventFields
    }
  }
  ${EVENT_FIELDS}
`

export const UPDATE_EVENT = gql`
  mutation updateEvent($eventId: Int!, $set: event_set_input = {}) {
    event: update_event_by_pk(pk_columns: { id: $eventId }, _set: $set) {
      ...EventFields
    }
  }
  ${EVENT_FIELDS}
`

export const DELETE_EVENT = gql`
  mutation deleteEvent($eventId: Int!) {
    event: delete_event_by_pk(id: $eventId) {
      ...EventFields
    }
  }
  ${EVENT_FIELDS}
`
