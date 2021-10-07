/**
 * Components - Posts - Hooks - useDelete - Types
 */

// Types
import { Post, POST_TYPE } from '../../../../types/post.d'
import { UseHookOutput, UseHookProps } from '../../../../types/hook.d'
import { postFilter } from '../usePost/types.d'

export interface PostDeleteVariables {
  id: number
}

export interface PostDeleteData {
  post: Post
}

export interface useDeletePostProps extends UseHookProps<PostDeleteData> {
  filters: postFilter
  id: number
}

export interface UseDeletePostOutput extends UseHookOutput {
  deletePost: any
}

export interface PostDeleteType {
  id: number
  entity: string
  entityId: number
  accountId: number
  type?: POST_TYPE
  title: string
}
