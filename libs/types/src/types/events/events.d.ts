/**
 * Components - Events - Types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

//Types
import { Filter, LooseObject } from '../general'
import { Taxonomy } from '../taxonomies'

export interface EventFilter extends Filter {
  accountId: number
  taxonomy: Options
  status: STATUS_ACTIVE
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
