/**
 * Components - Media - Hooks - useUpdate - Types.d
 */

// Types
import { Medium } from '.'
import { STATUS_ACTIVE, UseHookOutput } from '../general'

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
