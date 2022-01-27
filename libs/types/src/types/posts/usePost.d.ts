/**
 * Components - Posts - Hooks - types
 */

// Types
import { Post, POST_TYPE } from '.'

// Constants
import { ENTITIES } from '../../constants'

export interface PostFilter {
  accountId: number
  entity: ENTITIES
  entityId: number
  type: POST_TYPE
}

export interface PostDataList {
  posts: Post[]
}
