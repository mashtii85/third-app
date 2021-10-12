/**
 * Components - Events - Hooks - useEvents
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_EVENTS } from '../../queries'

// Types
import { EventsData, EventsVariables, UseEventsOutput, UseEventsProps } from './types'

// Helpers
import { prepareEventsArguments } from './helpers'

export const useEvents = ({ filters }: UseEventsProps): UseEventsOutput => {
  const variables = prepareEventsArguments({ filters })
  const { data, error, loading } = useQuery<EventsData, EventsVariables>(GET_EVENTS, {
    variables
  })

  if (error) {
    return { loading: false, error, eventList: [] }
  }

  return { loading, eventList: data?.events || [] }
}
