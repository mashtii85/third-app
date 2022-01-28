/**
 * Components - Courses - View - Account - Hooks - UseUpdate - Types.d
 */

// Types
import { LessonProgress, UseHookOutput } from '..'

// Constants
import { LESSON_PROGRESS_STATUS } from '@availabletowork/constants'

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
