/**
 * Types - Medium
 */

// Types
import { Post } from './post.d'
import { STATUS_ACTIVE } from './select.d'

export enum MEDIUM_CATEGORY {
  Avatar = 'avatar',
  Cover = 'cover',
  Logo = 'logo',
  Lesson = 'lesson',
  Resource = 'resource'
}

export enum MEDIUM_TYPE {
  Document = 'document',
  Image = 'image',
  Video = 'video'
}

export interface DropzoneType extends Blob {
  lastModified: number
  lastModifiedDate: Date
  name: string
  path: string
  preview: string
  size: number
  type: string
}

export interface DropzoneProps {
  accept?: string
  disabled?: boolean
  multiple?: boolean
  onChange?: () => void
}

export interface Medium {
  id?: number
  client_id: number
  entity?: string
  entity_id?: number
  type: MEDIUM_TYPE
  status: STATUS_ACTIVE
  caption?: string
  category?: MEDIUM_CATEGORY
  extension?: string
  filename: string
  post?: Post
  // It's good to have a file size column
}
