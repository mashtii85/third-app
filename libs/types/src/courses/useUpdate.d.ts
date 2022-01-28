/**
 * Components - Courses - List - Table - Hooks - useDeleteCourse - Types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Course } from '.'
import { UseHookOutput } from '../general'

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
