/**
 * Types - Course Enrollment
 */

// Constants
import { COURSE_ENROLLMENT_STATUS } from '@availabletowork/constants'

export interface CourseEnrollment {
  id?: number
  status?: COURSE_ENROLLMENT_STATUS
  updated_at?: Date
}
