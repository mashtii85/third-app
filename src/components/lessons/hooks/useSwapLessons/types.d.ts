/**
 * Components - Lessons - Hooks - useUpdate - Types.d
 */

// Types.d
import { Lesson } from '../../../../types/lesson.d'
import { UseHookOutput } from '../../../../types/hook.d'

export interface SwapLessonsProps {
  downId: number
  downOrdering: number
  upId: number
  upOrdering: number
}

export interface LessonUpdateData {
  lesson: Lesson
}

export interface UseUpdateLessonOutput extends UseHookOutput {
  updateLesson: any
}
