/**
 * Types - Lesson
 */

export enum LESSON_TYPE {
  text,
  video,
  quiz,
  assignment
}

export interface Lesson {
  id: number
  type: LESSON_TYPE
  title: string
  description?: string
  content: any
  ordering?: number
  status: 'pending' | 'started' | 'completed'
}
