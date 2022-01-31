/**
 * Components - Events - Hooks - useEvents
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_EVENTS } from '@availabletowork/queries'

// Types
import { EventsData, UseEventsOutput, UseEventsProps } from '@availabletowork/types'

// Helpers
import { prepareEventsArguments } from './helpers'

export const useEvents = ({ filters }: UseEventsProps): UseEventsOutput => {
  const variables = prepareEventsArguments({ filters })

  const { data, error, loading } = useQuery<EventsData>(GET_EVENTS, {
    variables
  })

  return { error, loading, eventList: data?.events || [] }
}
