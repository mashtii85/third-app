/**
 * Components - Enrollments - Hooks - UseUpdate - Types.d
 */

// Types.d
import { CourseEnrollment } from '.'
import { UseHookOutput } from '..'

// Constants
import { COURSE_ENROLLMENT_STATUS } from '@availabletowork/constants'

export interface CourseEnrollmentUpdateVariables {
  id: number
  changes: { status: COURSE_ENROLLMENT_STATUS }
}

export interface CourseEnrollmentUpdateData {
  courseEnrollment: CourseEnrollment
}

export interface UseUpdateCourseEnrollmentOutput extends UseHookOutput {
  updateCourseEnrollment: any
}
