/**
 * Types - Post
 */

// Constants
import { POST_TYPE, RESOURCE_TYPE, STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Medium } from '../media'

export interface PostCustomFields {
  resource_type: RESOURCE_TYPE
  link?: string
  filename?: string
  filesize?: number
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
  updated_at?: Date
  publish_at?: Date
  expire_at?: Date
  status: STATUS_ACTIVE
  custom_fields?: PostCustomFields
  media?: Medium[]
}
