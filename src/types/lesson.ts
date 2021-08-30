/**
 * Types - Lesson
 */

export interface Lesson {
  status: 'pending' | 'started' | 'completed';
  id: number
  type: 'text' | 'video' | 'quizz' | 'assignment'
  title: string
  status?: 'inprogress' | 'done' | 'todo'
  description?: string
  content: any
  ordering?: number
}
