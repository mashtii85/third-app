/**
 * Types - Lesson Progress
 */

import { Lesson } from './lesson'

export enum LESSON_PROGRESS_STATUS {
  Pending = 'pending',
  Started = 'started',
  Completed = 'completed'
}

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
