/**
 * Components - Posts - Hooks - useDelete - Types
 */

// Types
import { Post, PostFilter, POST_TYPE } from '.'
import { UseHookOutput, UseHookProps } from '../general'

export interface PostDeleteVariables {
  id: number
}

export interface PostDeleteData {
  post: Post
}

export interface useDeletePostProps extends UseHookProps<PostDeleteData> {
  filters: PostFilter
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
