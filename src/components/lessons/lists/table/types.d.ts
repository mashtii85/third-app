/**
 * Components - Lessons - List - Table - Types
 */

import { LESSON_TYPE, LESSON_STATUS } from '../../../../types/lesson.d'
import { STATUS_ACTIVE } from '../../../../types/select.d'

export interface LessonTableRowsType {
  id?: number
  title: string
  description: string
  type: LESSON_TYPE
  content: string
  status: LESSON_STATUS
  date: string
}

interface LessonToolbarType {
  id?: number
  courseId: number
  title: string
  description?: string
  ordering?: number
  status: STATUS_ACTIVE
}
