/**
 * Components - Enrollments - Hooks - UseUpdate - Types.d
 */

// Types.d
import { UseHookOutput } from '../../../../types/hook.d'
import { CourseEnrollment, COURSE_ENROLLMENT_STATUS } from '../../../../types/courseEnrollment.d'

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
