/**
 * Components - Events - Types.d
 */

import { Filter } from '../../types/filter'
import { LooseObject } from '../../types/object'
import { Options } from '../../types/options'
import { STATUS_ACTIVE } from '../../types/select'
import { Taxonomy } from '../../types/taxonomy'

export interface EventFilter extends Filter {
  accountId: number
  taxonomy: Options
  status: STATUS_ACTIVE
}

export interface Event {
  id: number | undefined
  account_id: number
  title: string
  status: STATUS_ACTIVE
  created_at: string
  taxonomy_id: number
  taxonomy?: Taxonomy
  custom_fields: LooseObject
  start_at?: Date
  end_at?: Date
  location_id: number
  description: string
}
