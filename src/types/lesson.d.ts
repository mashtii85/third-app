/**
 * Types - Lesson
 */

import { Medium } from './medium'

export enum LessonType {
  text,
  video,
  quiz,
  assignment
}

export enum LessonStatus {
  pending,
  started,
  completed
}

export interface Lesson {
  id: number
  type: LessonType
  title: string
  description?: string
  content: string
  media?: Medium[]
  ordering?: number
  status: LessonStatus
}
