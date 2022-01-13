/**
 * Components - Events - Hooks - UseUpdateEvent - Types.d
 */

// Types.d
import { STATUS_ACTIVE } from '../../../../types/select'
import { UseHookOutput } from '../../../../types/hook'
import { Event } from '../../types'

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
