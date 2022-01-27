/**
 * Types - Post
 */

// Types
import { STATUS_ACTIVE } from '../general'
import { Medium } from '../media'

export enum RESOURCE_TYPE {
  File = 'file',
  Link = 'link'
}

export enum POST_TYPE {
  Note = 'note',
  Resource = 'resource'
}

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
