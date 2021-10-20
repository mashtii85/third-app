/**
 * Components - Media - Hooks - types
 */

// Types
import { Medium, MEDIUM_TYPE, MEDIUM_CATEGORY } from '../../../../types/medium.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { LooseObject } from '../../../../types/object.d'
import { ENTITIES } from '../../../../constants/entities'

export interface MediaFilter {
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
