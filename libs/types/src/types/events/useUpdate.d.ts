/**
 * Components - Events - Hooks - UseUpdateEvent - Types.d
 */

// Types
import { STATUS_ACTIVE, UseHookOutput } from '../general'
import { Event } from './events'

export interface EventUpdateVariables {
  accountId: number
  set: {
    status: STATUS_ACTIVE
    name: string
  }
}

export interface EventUpdateData {
  event: Event
}

export interface UseUpdateEventOutput extends UseHookOutput {
  updateEvent: any
}
