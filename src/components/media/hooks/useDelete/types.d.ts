/**
 * Components - media - Hooks - useDelete - Types.d
 */

// Types.d
import { Medium } from '../../../../types/medium.d'
import { UseHookOutput, UseHookProps } from '../../../../types/hook.d'
import { MediaFilter } from '../get/types'

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
  entity?: string
  entityId?: number
  caption?: string
}
