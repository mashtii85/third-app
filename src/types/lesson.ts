/**
 * Types - Lesson
 */

export interface Lesson {
  id: number
  type: 'text' | 'video' | 'quizz' | 'assignment'
  title: string
  description?: string
  content: any
  ordering?: number
}
