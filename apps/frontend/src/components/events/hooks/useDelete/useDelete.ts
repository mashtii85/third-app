/**
 * Components - Events - Hooks - UseDelete - UseDelete
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_EVENT, GET_EVENTS } from '@availabletowork/queries'

// Helpers
import { prepareEventsArguments } from '../useEvents/helpers'

// Types
import {
  Event,
  EventDeleteData,
  EventDeleteVariables,
  useDeleteEventProps,
  useDeleteEventOutput,
  EventQuery,
  GQLClause
} from '@availabletowork/types'

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
