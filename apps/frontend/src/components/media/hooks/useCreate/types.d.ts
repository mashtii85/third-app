/**
 * Components - Media - Hooks - useCreate - Types.d
 */

// Types.d
import { Medium, MEDIUM_CATEGORY, MEDIUM_TYPE } from '../../../../types/medium.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { UseHookOutput } from '../../../../types/hook.d'

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
