/**
 * Components - Course - Resources - List - Table - Types
 */

// Types
import { POST_TYPE } from '../../../../../types/post.d'

export interface ResourcesTableRowsType {
  id: number
  title: string
  type: POST_TYPE
  content: string
  date: string
}

interface PostToolbarType {
  type: POST_TYPE
}
