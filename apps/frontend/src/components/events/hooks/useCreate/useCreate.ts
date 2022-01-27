/**
 * Components - Events - List - Table - Hooks - UseEventQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_EVENT, GET_EVENTS } from '../../queries'

//Types
import {
  CreateEventVariables,
  Event,
  EventDeleteVariables,
  LooseObject,
  UseCreateEventProps,
  UseCreateEventOutput
} from '@availabletowork/types'

import { prepareEventsArguments } from '../useEvents/helpers'

export const useCreateEvent = (props: UseCreateEventProps): UseCreateEventOutput => {
  const [createEvent, { error, loading }] = useMutation<CreateEventVariables, EventDeleteVariables>(
    CREATE_EVENT,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const eventFromResponse = data?.event
        if (eventFromResponse) {
          return
        }

        const variables: LooseObject = prepareEventsArguments({
          filters: props.filters
        })

        variables.account_id = { _eq: props.filters.accountId }
        const { events } = cache.readQuery<{ events: Event[] }, any>({
          query: GET_EVENTS,
          variables
        }) || { events: [] }

        cache.writeQuery<{ events: Event[] }>({
          query: GET_EVENTS,
          variables,
          data: { events: [...events, eventFromResponse] }
        })
      }
    }
  )

  return { error, createEvent, loading }
}
