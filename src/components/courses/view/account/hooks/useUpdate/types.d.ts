/**
 * Components - Courses - View - Account - Hooks - UseUpdate - Types.d
 */

// Types.d
import { UseHookOutput } from '../../../../../../types/hook'
import { LessonProgress, LESSON_PROGRESS_STATUS } from '../../../../../../types/lessonProgress.d'

export interface LessonProgressUpdateVariables {
  id: number
  changes: { status: LESSON_PROGRESS_STATUS }
}

export interface LessonProgressUpdateData {
  lessonProgress: LessonProgress
}

export interface UseUpdateLessonProgressOutput extends UseHookOutput {
  updateLessonProgress: any
}
