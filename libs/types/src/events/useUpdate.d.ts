/**
 * Components - Events - Hooks - UseUpdateEvent - Types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'
// Types
import { UseHookOutput } from '../general'
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
