/**
 * Components - Events - Hooks - UseEvents - Types.d
 */

import { UseHookOutput } from '../../../../types/hook'
import { Event, EventFilter } from '../../types'

export interface UseEventsProps {
  filters: EventFilter
}

export interface UseEventsOutput extends UseHookOutput {
  eventList: Event[]
}

export interface EventsData {
  events: Event[]
}

// we need to compe up with an idea to strongly typed variables
export interface EventsVariables {}

export interface PrepareEventArgumentProps {
  filters?: EventFilter
}
