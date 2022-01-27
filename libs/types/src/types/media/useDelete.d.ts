/**
 * Components - media - Hooks - useDelete - Types.d
 */

// Types
import { MediaFilter, Medium } from '.'
import { UseHookOutput, UseHookProps } from '../general'

export interface MediaDeleteVariables {
  id: number
}

export interface MediaDeleteData {
  media: Medium
}

export interface useDeletemediaProps extends UseHookProps<MediaDeleteData> {
  filters: MediaFilter
  id: number
}

export interface UseDeleteMediaOutput extends UseHookOutput {
  deleteMedia: any
}

interface MediaDeleteProps {
  id: number
  clientId: number
  taxonomyId: number
  entity: string
  entityId: number
  caption: string
}
