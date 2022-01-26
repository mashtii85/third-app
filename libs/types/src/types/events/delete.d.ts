/**
 * Components - Events - Forms - Delete - Types.d
 */

import { EventFilter } from './events'

export interface DeleteEventProps {
  eventId: number
  filters: EventFilter
  title: string
  onSuccess: () => void
}
