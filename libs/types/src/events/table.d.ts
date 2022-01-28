/**
 * Components - Events - List - Table - Types
 */

import { Event, EventFilter } from './events'

export interface EventTableRowsType extends Omit<Event, 'account_id' | 'taxonomy_id'> {
  actions: string
}

interface EventTableProps {
  filters: EventFilter
}
