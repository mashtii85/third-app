/**
 * Components - Groups - List - Table - Types
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

export interface GroupTableRowsType {
  id?: number
  accountId: number
  taxonomyId: number
  name: string
  description: string
  status: STATUS_ACTIVE
  date: string
}

interface GroupToolbarType {
  id?: number
  accountId: number
  taxonomyId: number
  name: string
  description?: string
  status: STATUS_ACTIVE
}
