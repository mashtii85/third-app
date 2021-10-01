/**
 * Components - Locations - Types.d
 */

import { Filter } from '../../types/filter.d'
import { LooseObject } from '../../types/object'
import { STATUS_ACTIVE } from '../../types/select.d'
import { Taxonomy } from '../../types/taxonomy'

export interface LocationFilter extends Filter {
  status: STATUS_ACTIVE
}

export interface Location {
  id: number
  name: string
  status: STATUS_ACTIVE
  created_at: string
  taxonomy?: Taxonomy
  custom_fields: LooseObject
}
