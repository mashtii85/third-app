/**
 * Components - Lessons - Hooks - useDelete - Types.d
 */

// Types
import { Lesson } from '.'
import { UseHookOutput, UseHookProps } from '../general'
import { LessonFilter } from './useLesson'

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
