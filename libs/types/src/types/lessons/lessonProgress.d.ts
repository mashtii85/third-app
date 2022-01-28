/**
 * Types - Lesson Progress
 */

// Constants
import { LESSON_PROGRESS_STATUS } from '@availabletowork/constants'

// Types
import { Lesson } from './lesson'

export interface LessonProgressMeta {
  quizScore: number
  quizPassed: boolean
}

export interface LessonProgressUpdateModel {
  points: number
  status: LESSON_PROGRESS_STATUS
  meta?: LessonProgressMeta
}

export interface LessonProgress {
  id?: number
  label?: string
  status?: LESSON_PROGRESS_STATUS
  updated_at?: Date
  lesson?: Lesson
  meta?: LessonProgressMeta
  points?: number
}
