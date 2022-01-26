/**
 * Components - Groups - Hooks - types
 */

// Types
import { ENTITIES } from '../../constants/entities'
import { Group } from '../../../../types/group'
import { STATUS_ACTIVE } from '../../../../types/select.d'

export interface GroupFilter {
  accountId: number
  taxonomyId: number
  entityId: number
  entity: ENTITIES
  name: string
  description: string
  status: STATUS_ACTIVE
}

export interface GroupDataList {
  groups: Group[]
}
