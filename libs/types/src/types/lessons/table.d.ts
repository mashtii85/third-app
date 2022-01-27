/**
 * Components - Lessons - List - Table - Types
 */

import { LESSON_STATUS, LESSON_TYPE } from '.'

export interface LessonTableRowsType {
  id?: number
  title: string
  description: string
  type: LESSON_TYPE
  content: string
  ordering: number
  status: LESSON_STATUS
  date: string
}
