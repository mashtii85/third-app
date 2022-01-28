/**
 * Components - GroupEntities - Table - Types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

export interface GroupEntityRow {
  id?: number
  groupName: string
  status: STATUS_ACTIVE
  actions: string
}
