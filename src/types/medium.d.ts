/**
 * Types - Medium
 */

export enum MEDIUM_CATEGORY {
  Avatar = 'avatar',
  Cover = 'cover',
  Logo = 'logo',
  Lesson = 'lesson'
}

export enum MEDIUM_TYPE {
  Document = 'document',
  Image = 'image',
  Video = 'video'
}

export interface Medium {
  id: number
  type: MEDIUM_TYPE
  category?: MEDIUM_CATEGORY
  filename: string
  caption?: string
}
