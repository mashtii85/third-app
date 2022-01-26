/**
 * Types - Module
 */

// Types
import { Sortable } from './baseTypes'
import { Lesson } from './lesson'
import { STATUS_ACTIVE } from './select.d'

export interface Module extends Sortable {
  course_id: number
  title: string
  description: string
  status: STATUS_ACTIVE
  lessons?: Lesson[]
}
