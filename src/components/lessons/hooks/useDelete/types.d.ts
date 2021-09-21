/**
 * Components - Lessons - Hooks - useDelete - Types.d
 */

// Types.d
import { Lesson } from '../../../../types/lesson.d'
import { UseHookOutput, UseHookProps } from '../../../../types/hook.d'
import { LessonFilter } from '../../hooks/types.d'

export interface LessonDeleteVariables {
  id: number
}

export interface LessonDeleteData {
  delete_lesson_by_pk: Lesson
}

export interface useDeleteLessonProps extends UseHookProps<LessonDeleteData> {
  filters: LessonFilter
  id: number
}

export interface UseDeleteLessonOutput extends UseHookOutput {
  deleteLesson: any
}
