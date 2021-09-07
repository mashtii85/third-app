import { LESSON_STATUS } from './lesson'
export interface LessonProgress {
  id: number
  label: string
  status: LESSON_STATUS
}
