/**
 * Components - Posts - Hooks - types
 */

// Types
import { Post, POST_TYPE } from '../../../../types/post.d'

export interface PostFilter {
  accountId: number
  entity: string
  entityId: number
  type: POST_TYPE
}

export interface PostDataList {
  posts: Post[]
}
