/**
 * Components - Events - Hooks - UseEvents - Types.d
 */

import { DBFilters } from '../../../../types/filter'
import { UseHookOutput } from '../../../../types/hook'
import { Event, EventFilter } from '../../types'

export interface UseEventsProps {
  filters: EventFilter
  accountId: number
}

export interface UseEventsOutput extends UseHookOutput {
  eventList: Event[]
}

export interface EventsData {
  events: Event[]
}

// we need to compe up with an idea to strongly typed variables
export interface EventsVariables { }

export interface PrepareEventArgumentProps {
  accountId: number
  filters?: EventFilter
}
