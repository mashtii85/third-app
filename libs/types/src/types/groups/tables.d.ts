/**
 * Components - Groups - List - Table - Types
 */

import { STATUS_ACTIVE } from '../general'

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
