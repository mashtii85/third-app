/**
 * Components - Media - Hooks - useCreate - Types.d
 */

// Constants
import { MEDIUM_CATEGORY, STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Medium, MEDIUM_TYPE } from '.'
import { UseHookOutput } from '../general'

export interface MediaCreateType {
  clientId: number
  entity: string
  entityId: number
  type: MEDIUM_TYPE
  status: STATUS_ACTIVE
  caption: string
  category: MEDIUM_CATEGORY
  extension: string
  filename: string
}

export interface MediaCreateData {
  media: { returning: Medium[] }
}

export interface UseCreateMediaOutput extends UseHookOutput {
  createMedia: any
}
