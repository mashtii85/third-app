/**
 * Components - Events - List - Table - Types
 */

import { Event, EventFilter } from '../../types'

export interface EventTableRowsType extends Event {
  id: number | undefined
  actions: string
}

interface EventTableProps {
  accountId: number
  filters: EventFilter
}
