/**
 * Components - Enrollments - Hooks - UseUpdate - Types.d
 */

// Types.d
import { CourseEnrollment, COURSE_ENROLLMENT_STATUS } from '.'
import { UseHookOutput } from '..'

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
