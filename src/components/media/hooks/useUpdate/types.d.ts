/**
 * Components - Media - Hooks - useUpdate - Types.d
 */

// Types.d
import { Media, MEDIA_STATUS } from '../../../../types/media.d'
import { UseHookOutput } from '../../../../types/hook.d'

export interface MediaUpdateVariables {
  id: number
  changes: {
    name: string
    line1: string
    line2: string
    line3: string
    city: String
    county: string
    postcode: string
    status: MEDIA_STATUS
  }
}

export interface MediaUpdateData {
  media: Media
}

export interface UseUpdateMediaOutput extends UseHookOutput {
  updateMedia: any
}
