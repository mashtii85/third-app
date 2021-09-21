/**
 * Components - Lessons - Hooks - useCreate - Types.d
 */

// Types.d
import { Lesson, LESSON_TYPE, LESSON_STATUS } from '../../../../types/lesson.d'
import { UseHookOutput } from '../../../../types/hook.d'

export interface LessonCreateVariables {
  courseId?: number
  moduleId?: number
  title?: string
  description?: string
  type?: LESSON_TYPE
  content?: string
  status?: LESSON_STATUS
}

export interface LessonCreateData {
  insert_lesson_one: Lesson
}

export interface UseCreateLessonOutput extends UseHookOutput {
  createLesson: any
}
