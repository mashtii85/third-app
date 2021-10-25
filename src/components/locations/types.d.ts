/**
 * Components - Locations - Types.d
 */

import { Filter } from '../../types/filter.d'
import { LooseObject } from '../../types/object'
import { Options } from '../../types/options'
import { STATUS_ACTIVE } from '../../types/select.d'
import { Taxonomy } from '../../types/taxonomy'

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
