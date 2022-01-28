/**
 * Components - Enrollments - Lists - EnrolledUsers - Table - Types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

export interface CourseEnrollmentsTableRowsType {
  id: number
  course?: string
  author: string
  user?: string
  completedLessons?: number
  date: string
  status: STATUS_ACTIVE
}
