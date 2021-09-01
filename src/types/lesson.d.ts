/**
 * Types - Lesson
 */

import { Medium } from './medium'

export enum LESSON_TYPE {
  Text = 'text',
  Video = 'video',
  Quiz = 'quiz',
  Assignment = 'assignment'
}

export enum LESSON_STATUS {
  Pending = 'pending',
  Started = 'started',
  Completed = 'completed'
}

export interface Lesson {
  id: number
  type: LESSON_TYPE
  title: string
  description?: string
  content: string
  media?: Medium[]
  ordering?: number
  status: LESSON_STATUS
}
