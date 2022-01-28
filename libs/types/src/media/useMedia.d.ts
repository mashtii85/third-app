/**
 * Components - Media - Hooks - types
 */

// Constants
import { ENTITIES, MEDIUM_CATEGORY, STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Medium, MEDIUM_TYPE } from '.'
import { LooseObject } from '../general'

export interface MediaFilter {
  clientId: number
  taxonomyId: number
  entity: ENTITIES
  entityId: number
  type: MEDIUM_TYPE
  status: STATUS_ACTIVE
  caption: string
  category: MEDIUM_CATEGORY
  extension: string
  filename: string
}

export interface UseMediaProps {
  entity: ENTITIES
  entityId: number
  category?: MEDIUM_CATEGORY
  type?: MEDIUM_TYPE
}

export interface MediaData {
  media: Medium
}

export interface MediaDataList {
  media: Medium[]
}

export interface MediaSearchVariables {
  where: LooseObject
  order_by: LooseObject
}

export interface MediaVariables {
  mediaId: number
}
