/**
 * Components - Locations - List - Table - Types
 */

import { Location, LocationFilter } from '../../types.d'

export interface LocationTableRowsType extends Omit<Location, 'account_id' | 'taxonomy_id'> {
  actions: string
}

interface LocationTableProps {
  accountId: number
  filters: LocationFilter
}
