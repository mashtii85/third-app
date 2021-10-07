/**
 * Components - Locations - List - Table - Types
 */

import { Location, LocationFilter } from '../../types.d'

export interface LocationTableRowsType extends Location {
  actions: string
}

interface LocationTableProps {
  accountId: number
  filters: LocationFilter
}
