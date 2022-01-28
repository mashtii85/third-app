/**
 * Components - Events - Hooks - UseCreate - Types.d
 */

//Types
import { Event } from '.'
import { UseHookOutput, UseHookProps } from '../general'

export interface CreateEventVariables {
  event: Event
}

export interface UseCreateEventProps extends UseHookProps<CreateEventVariables> {
  filters: EventFilter
}

export interface UseCreateEventOutput extends UseHookOutput {
  createEvent: any
}
