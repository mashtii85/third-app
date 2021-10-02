/**
 * Types - Module
 */

// Types
import { Lesson } from './lesson.d'
import { STATUS_ACTIVE } from './select.d'

export interface Module {
  id: number
  course_id: number
  title: string
  description: string
  ordering?: number
  status: STATUS_ACTIVE
  lessons?: Lesson[]
}
