/**
 * Components - Courses - Hooks - useDeleteCourse - Types.d
 */

// Types.d
import { Course } from '../../../../types/course.d'
import { UseHookProps } from '../../../../types/hook.d'
import { CourseFilter } from '../types.d'

export interface CourseDeleteVariables {
  courseId: number
}

export interface CourseDeleteData {
  course: Course
}

export interface useDeleteCourseProps extends UseHookProps<CourseDeleteData> {
  filters: CourseFilter
}
export interface useDeleteCourseOutput {
  deleteCourse: any
  loading: boolean
}
