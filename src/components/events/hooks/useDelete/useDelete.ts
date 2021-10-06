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
import { LooseObject } from '../../../../types/object'
import { EventQuery } from '../types'

export const useDeleteEvent = (props: useDeleteEventProps): useDeleteEventOutput => {
  const [deleteEvent, { loading }] = useMutation<EventDeleteData, EventDeleteVariables>(
    DELETE_EVENT,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const variables: LooseObject = prepareEventsArguments({
          filters: props.filters,
          accountId: props.accountId
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
