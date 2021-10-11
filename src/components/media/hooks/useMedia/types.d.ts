/**
 * Components - Media - Hooks - types
 */

// Types
import { Medium, MEDIUM_TYPE, MEDIUM_CATEGORY } from '../../../../types/medium.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { LooseObject } from '../../../../types/object.d'

export interface MediaFilter {
  entity: string
  entityId: number
  type: MEDIUM_TYPE
  status: STATUS_ACTIVE
  caption: string
  category: MEDIUM_CATEGORY
  extension: string
  filename: string
}

export interface UseMediaProps {
  entity: string
  entityId: number
  category?: string
  type?: string
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
