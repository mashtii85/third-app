/**
 * Types - Lesson Progress
 */

export enum LESSON_PROGRESS_STATUS {
  Pending = 'pending',
  Started = 'started',
  Completed = 'completed'
}

export interface LessonProgress {
  id: number
  label: string
  status: LESSON_PROGRESS_STATUS
  /* eslint-disable camelcase */
  updated_at: Date
}
