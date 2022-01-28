/**
 * Components - Posts - Hooks - types
 */

// Types
import { Post } from '.'

// Constants
import { ENTITIES, POST_TYPE } from '@availabletowork/constants'

export interface PostFilter {
  accountId: number
  entity: ENTITIES
  entityId: number
  type: POST_TYPE
}

export interface PostDataList {
  posts: Post[]
}
