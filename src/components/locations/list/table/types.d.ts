/**
 * Components - Locations - List - Table - Types
 */

import { Location, LocationFilter } from '../../types.d'

export interface LocationTableRowsType extends Location {
  id: number | undefined
  actions: string
}

interface LocationTableProps {
  accountId: number
  filters: LocationFilter
}
