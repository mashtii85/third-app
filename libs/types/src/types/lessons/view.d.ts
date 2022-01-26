/**
 * Components - Lessons - View - types.d
 */

// Types
import { LESSON_TYPE, LESSON_STATUS } from '../../../types/lesson.d'
import { Medium } from '../../../types/medium.d'

export interface LessonDetailsToolbarType {
  id: number
  title: string
  description: string
  type: LESSON_TYPE
  status: LESSON_STATUS
}

export interface LessonViewStateHolder {
  editMode: boolean
  medium: Medium
}
