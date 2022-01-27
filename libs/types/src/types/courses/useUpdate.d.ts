/**
 * Components - Courses - List - Table - Hooks - useDeleteCourse - Types.d
 */

// Types
import { Course } from '.'
import { STATUS_ACTIVE, UseHookOutput } from '../general'

export interface CourseUpdateVariables {
  courseId: number
  set: {
    status: STATUS_ACTIVE
    description: string
  }
}

export interface CourseUpdateData {
  course: Course
}

export interface UseUpdateCourseOutput extends UseHookOutput {
  updateCourse: any
}
