/**
 * Components - Lessons - View - types.d
 */

// Types
import { LESSON_TYPE, LESSON_STATUS } from '../../../types/lesson.d'

export interface LessonDetailsToolbarType {
  id: number
  title: string
  description: string
  type: LESSON_TYPE
  status: LESSON_STATUS
}

export interface LessonContentToolbarType {
  id: number
  content: string
}
