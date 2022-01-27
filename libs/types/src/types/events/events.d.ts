/**
 * Components - Events - Types.d
 */

//Types
import { Filter, LooseObject, STATUS_ACTIVE } from '../general'
import { Taxonomy } from '../taxonomies'

export interface EventFilter extends Filter {
  accountId: number
  taxonomy: Options
  status: STATUS_ACTIVE
}

export enum CALENDAR_STATUS {
  Cancelled = 'cancelled',
  Completed = 'completed',
  Pending = 'sending',
  Started = 'started'
}

export interface Event {
  id: number | undefined
  account_id: number
  title: string
  status: CALENDAR_STATUS
  created_at: string
  taxonomy_id: number
  taxonomy?: Taxonomy
  custom_fields: LooseObject
  start_at?: Date
  end_at?: Date
  location_id: number
  description: string
}
