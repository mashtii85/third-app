/**
 * Components - Events - List - Table - Hooks - UseEventQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { LooseObject } from '../../../../types/object'
import { CREATE_EVENT, GET_EVENTS } from '../../queries'
import { Event } from '../../types'
import { EventDeleteVariables } from '../useDelete/types'

import { prepareEventsArguments } from '../useEvents/helpers'

// Types
import { UseCreateEventProps, UseCreateEventOutput, CreateEventVariables } from './types'

export const useCreateEvent = (props: UseCreateEventProps): UseCreateEventOutput => {
  const [createEvent, { error, loading }] = useMutation<CreateEventVariables, EventDeleteVariables>(
    CREATE_EVENT,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        if (!data?.event) {
          return
        }
        const eventFromResponse = data.event
        const variables: LooseObject = prepareEventsArguments({
          filters: props.filters,
          accountId: props.accountId
        })

        variables.account_id = { _eq: props.accountId }
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
