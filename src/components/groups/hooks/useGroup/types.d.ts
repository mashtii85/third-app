/**
 * Components - Groups - Hooks - types
 */

// Types
import { Group } from '../../../../types/group.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'

export interface GroupFilter {
  accountId: number
  taxonomyId: number
  name: string
  description: string
  status: STATUS_ACTIVE
}

export interface GroupDataList {
  groups: Group[]
}
