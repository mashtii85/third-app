/**
 * Components - Enrollments - Lists - EnrolledUsers - Table - Types.d
 */

import { STATUS_ACTIVE } from '../general'

export interface CourseEnrollmentsTableRowsType {
  id: number
  course?: string
  author: string
  user?: string
  completedLessons?: number
  date: string
  status: STATUS_ACTIVE
}
