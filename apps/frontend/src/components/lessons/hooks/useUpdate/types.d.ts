/**
 * Components - Lessons - Hooks - useUpdate - Types.d
 */

// Types.d
import { Lesson, LESSON_STATUS } from '../../../../types/lesson.d'
import { UseHookOutput } from '../../../../types/hook.d'

export interface LessonUpdateVariables {
  id: number
  changes: {
    title: string
    description: string
    status: LESSON_STATUS
  }
}

export interface LessonUpdateData {
  lesson: Lesson
}

export interface UseUpdateLessonOutput extends UseHookOutput {
  updateLesson: any
}
