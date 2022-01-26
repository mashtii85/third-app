/**
 * Components - Enrollments - Lists - EnrolledUsers - Table - Types.d
 */

import { STATUS_ACTIVE } from '../../../../../types/select.d'

export interface CourseTableRowsType {
  id: number
  course?: string
  author: string
  user?: string
  completedLessons?: number
  date: string
  status: STATUS_ACTIVE
}
