/**
 * Components - Posts - Hooks - useCreate - Types
 */

// Types
import { Post, POST_TYPE } from '.'
import { STATUS_ACTIVE, UseHookOutput } from '../general'

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
