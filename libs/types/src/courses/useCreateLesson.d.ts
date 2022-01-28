/**
 * Components - Courses - View - Account - Hooks - UseCreate - Types.d
 */

// Constants
import { LESSON_PROGRESS_STATUS } from '@availabletowork/constants'

// Types
import { Course } from '.'
import { UseHookOutput } from '..'

export interface CreateLessonProgressVariables {
  enrollment_id: number
  lesson_id: number
  status: LESSON_PROGRESS_STATUS
}

export interface UseCreateLessonProgressOutput extends UseHookOutput {
  createLessonProgress: any
}

export interface LessonProgressQueryData {
  courses: Course[]
}
