/**
 * Components - Courses - View - Account - Table - Types
 */

// Types
import { LESSON_PROGRESS_STATUS } from '../../../../../types/lessonProgress'

export interface Breadcrumbs {
  to: string
  title: string
}

export interface LessonProgressMutationType {
  enrollment_id: number
  lesson_id: number
  status: LESSON_PROGRESS_STATUS
}
