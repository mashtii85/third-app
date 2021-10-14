/**
 * Components - Lessons - Edit - types.d
 */

// Types
import { LESSON_TYPE } from '../../../../types/lesson.d'

export interface LessonFormType {
  id: number
  type: LESSON_TYPE
  content: string
}
