/**
 * Components - Posts - Hooks - useUpdate - Types
 */

// Types
import { Post } from '../../../../types/post.d'
import { UseHookOutput } from '../../../../types/hook.d'

export interface PostUpdateVariables {
  id: number
  changes: {
    title: string
    subtitle?: string
    content?: string
  }
}

export interface PostUpdateData {
  post: Post
}

export interface UseUpdatePostOutput extends UseHookOutput {
  updatePost: any
}
