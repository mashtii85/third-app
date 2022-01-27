/**
 * Components - Events - Hooks - UseEvents - Types.d
 */

//Types
import { UseHookOutput } from '../general'
import { Event, EventFilter } from './events'

export interface UseEventsProps {
  filters?: Partial<EventFilter>
}

export interface UseEventsOutput extends UseHookOutput {
  eventList: Event[]
}

export interface EventsData {
  events: Event[]
}

export interface PrepareEventArgumentProps {
  filters?: Partial<EventFilter>
}
