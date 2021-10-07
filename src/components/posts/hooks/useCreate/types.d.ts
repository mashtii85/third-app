/**
 * Components - Posts - Hooks - useCreate - Types
 */

// Types.d
import { Post, POST_TYPE } from '../../../../types/post.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { UseHookOutput } from '../../../../types/hook.d'

export interface PostCreateType {
  accoutId: number
  entityId: number
  entity: string
  title: string
  subtitle: string
  type: POST_TYPE
  content?: string
  status: STATUS_ACTIVE
}

export interface PostCreateData {
  posts: { returning: Post[] }
}

export interface UseCreatePostOutput extends UseHookOutput {
  createPost: any
}
