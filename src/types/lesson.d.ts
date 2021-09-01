/**
 * Types - Lesson
 */

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
  ordering?: number
  status: LessonStatus
}
