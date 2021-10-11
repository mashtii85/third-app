/**
 * Components - Events - Hooks - UseDeleteEvents - Types.d
 */

// Types.d
import { UseHookProps } from '../../../../types/hook'
import { Event, EventFilter } from '../../types'

export interface EventDeleteVariables {
  eventId: number
}

export interface EventDeleteData {
  event: Event
}

export interface useDeleteEventProps extends UseHookProps<EventDeleteData> {
  filters: EventFilter
}
export interface useDeleteEventOutput {
  deleteEvent: any
  loading: boolean
}
