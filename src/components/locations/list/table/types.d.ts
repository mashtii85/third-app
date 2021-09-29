/**
 * Components - Locations - List - Table - Types
 */

import { STATUS_ACTIVE } from '../../../../types/select.d'
import { LocationFilter } from '../../types.d'

export interface LocationTableRowsType {
  id: number | undefined
  name: string
  status: STATUS_ACTIVE
  created_at: string
  actions: string
}

interface LocationTableProps {
  accountId: number
  filters: LocationFilter
}
