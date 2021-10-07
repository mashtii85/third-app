/**
 * Components - Course - Notes - List - Table - Types
 */

// Types
import { POST_TYPE } from '../../../../../types/post.d'

export interface NotesTableRowsType {
  id: number
  title: string
  content: string
  date: string
}

interface PostToolbarType {
  type: POST_TYPE
}
