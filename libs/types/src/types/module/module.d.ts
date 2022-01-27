/**
 * Types - Module
 */

// Types
import { Lesson } from '../lessons'
import { Sortable, STATUS_ACTIVE } from '../general'

export interface Module extends Sortable {
  course_id: number
  title: string
  description: string
  status: STATUS_ACTIVE
  lessons?: Lesson[]
}
