/**
 * Types - Course Enrollment
 */

export enum COURSE_ENROLLMENT_STATUS {
  Active = 'active',
  Completed = 'completed'
}

export interface CourseEnrollment {
  id?: number
  status?: COURSE_ENROLLMENT_STATUS
  updated_at?: Date
}
