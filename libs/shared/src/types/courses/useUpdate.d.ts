/**
 * Components - Courses - List - Table - Hooks - useDeleteCourse - Types.d
 */

// Types.d
import { STATUS_ACTIVE } from '../../../../types/select.d'
import { Course } from '../../../../types/course.d'
import { UseHookOutput } from '../../../../types/hook.d'

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
