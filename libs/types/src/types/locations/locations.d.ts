/**
 * Components - Locations - Types.d
 */

//Types
import { Filter, LooseObject, STATUS_ACTIVE } from '../general'
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
