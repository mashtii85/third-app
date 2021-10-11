/**
 * Components - Events - Hooks - UseDelete - UseDelete
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_EVENT, GET_EVENTS } from '../../queries'

// Helpers
import { prepareEventsArguments } from '../useEvents/helpers'

// Types
import {
  EventDeleteData,
  EventDeleteVariables,
  useDeleteEventProps,
  useDeleteEventOutput
} from './types'
import { EventQuery } from '../types'
import { GQLClause } from '../../../../types/gql'
import { Event } from '../../types'

export const useDeleteEvent = (props: useDeleteEventProps): useDeleteEventOutput => {
  const [deleteEvent, { loading }] = useMutation<EventDeleteData, EventDeleteVariables>(
    DELETE_EVENT,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const variables: GQLClause<Event> = prepareEventsArguments({
          filters: props.filters
        })

        const { events } = cache.readQuery<EventQuery>({
          query: GET_EVENTS,
          variables
        }) || { events: [] }

        const eventList = events.filter((event) => event.id !== data?.event.id)
        cache.writeQuery<EventQuery>({
          query: GET_EVENTS,
          variables,
          data: { events: eventList }
        })
      }
    }
  )
  return { deleteEvent, loading }
}
