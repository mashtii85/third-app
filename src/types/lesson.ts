/**
 * Types - Lesson
 */

export interface Lesson {
  //Related to https://app.clickup.com/t/yy9eeu
  //status: 'pending' | 'started' | 'completed';
  id: number
  type: 'text' | 'video' | 'quizz' | 'assignment'
  title: string
  status?: 'inprogress' | 'done' | 'todo'
  description?: string
  content: any
  ordering?: number
}
