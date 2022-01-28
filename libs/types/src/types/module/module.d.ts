/**
 * Types - Module
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'
// Types
import { Lesson } from '../lessons'
import { Sortable } from '../general'

export interface Module extends Sortable {
  course_id: number
  title: string
  description: string
  status: STATUS_ACTIVE
  lessons?: Lesson[]
}
