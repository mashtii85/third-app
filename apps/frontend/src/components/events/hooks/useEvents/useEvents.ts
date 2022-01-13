/**
 * Components - Events - Hooks - useEvents
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_EVENTS } from '../../queries'

// Types
import { EventsData, UseEventsOutput, UseEventsProps } from './types'

// Helpers
import { prepareEventsArguments } from './helpers'

export const useEvents = ({ filters }: UseEventsProps): UseEventsOutput => {
  const variables = prepareEventsArguments({ filters })

  const { data, error, loading } = useQuery<EventsData>(GET_EVENTS, {
    variables
  })

  return { error, loading, eventList: data?.events || [] }
}
