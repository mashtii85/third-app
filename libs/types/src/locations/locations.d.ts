/**
 * Components - Locations - Types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Filter, LooseObject } from '../general'
import { Taxonomy } from '../taxonomies'

export interface LocationFilter extends Partial<Filter> {
  accountId: number
  taxonomy: Options
  status: STATUS_ACTIVE
}

export interface Location {
  id: number
  account_id: number
  taxonomy_id: number
  name: string
  status: STATUS_ACTIVE
  created_at: string
  taxonomy?: Taxonomy
  custom_fields: LooseObject
}
