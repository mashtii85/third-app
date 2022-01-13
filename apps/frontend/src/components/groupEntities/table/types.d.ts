/**
 * Components - GroupEntities - Table - Types.d
 */

import { STATUS_ACTIVE } from '../../../types/select'

export interface GroupEntityRow {
  id?: number
  groupName: string
  status: STATUS_ACTIVE
  actions: string
}

interface GroupToolbarType {
  id?: number
  accountId: number
  taxonomyId: number
  name: string
  description?: string
  status: STATUS_ACTIVE
}
