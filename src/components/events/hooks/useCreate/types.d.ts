/**
 * Components - Events - Hooks - UseCreate - Types.d
 */

import { UseHookOutput, UseHookProps } from '../../../../types/hook'
import { Event, EventFilter } from '../../types'

export interface CreateEventVariables {
  event: Event
}

export interface UseCreateEventProps extends UseHookProps<CreateEventVariables> {
  filters: EventFilter
}

export interface UseCreateEventOutput extends UseHookOutput {
  createEvent: any
}
