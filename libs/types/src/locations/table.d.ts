/**
 * Components - Locations - List - Table - Types
 */

import { Location, LocationFilter } from './locations'

export interface LocationTableRowsType extends Omit<Location, 'account_id' | 'taxonomy_id'> {
  actions: string
}

interface LocationTableProps {
  accountId: number
  filters: LocationFilter
}
