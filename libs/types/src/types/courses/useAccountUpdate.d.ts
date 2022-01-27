/**
 * Components - Courses - View - Account - Hooks - UseUpdate - Types.d
 */

import { LessonProgress, LESSON_PROGRESS_STATUS, UseHookOutput } from '..'

//
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
