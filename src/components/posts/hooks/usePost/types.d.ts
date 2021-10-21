/**
 * Components - Posts - Hooks - types
 */

// Constants
import { Post, POST_TYPE } from '../../../../types/post.d'

// Types
import { ENTITIES } from '../../../../constants/entities'

export interface PostFilter {
  accountId: number
  entity: ENTITIES
  entityId: number
  type: POST_TYPE
}

export interface PostDataList {
  posts: Post[]
}
