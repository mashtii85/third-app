/**
 * Components - Groups - Hooks - types
 */

// Types
import { ENTITIES } from '../../constants'
import { STATUS_ACTIVE } from '../general'
import { Group } from './group'

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
