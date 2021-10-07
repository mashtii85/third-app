/**
 * Types - Post
 */

// Types
import { STATUS_ACTIVE } from './select.d'

export enum POST_TYPE {
  Note = 'note'
}

export interface Post {
  id?: number
  account_id: number
  taxonomy_id?: number
  entity_id: number
  entity: string
  title: string
  subtitle?: string
  type: POST_TYPE
  content?: string
  created_at: Date
  updated_at?: Date
  publish_at?: Date
  expire_at?: Date
  status: STATUS_ACTIVE
}
