/**
 * Components - Media - Hooks - useUpdate - Types.d
 */

// Types.d
import { Medium } from '../../../../types/medium.d'
import { UseHookOutput } from '../../../../types/hook.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'

export interface MediaUpdateVariables {
  id: number
  changes: {
    name: string
    line1: string
    line2: string
    line3: string
    city: string
    county: string
    postcode: string
    status: STATUS_ACTIVE
  }
}

export interface MediaUpdateData {
  media: Medium
}

export interface UseUpdateMediaOutput extends UseHookOutput {
  updateMedia: any
}
