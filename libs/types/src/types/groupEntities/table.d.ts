/**
 * Components - GroupEntities - Table - Types.d
 */

import { STATUS_ACTIVE } from '../general'

export interface GroupEntityRow {
  id?: number
  groupName: string
  status: STATUS_ACTIVE
  actions: string
}
