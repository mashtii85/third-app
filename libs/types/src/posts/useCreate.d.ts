/**
 * Components - Posts - Hooks - useCreate - Types
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Post, POST_TYPE } from '.'
import { UseHookOutput } from '../general'

export interface PostCreateType {
  accountId: number
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
