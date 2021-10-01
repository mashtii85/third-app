/**
 * Components - Courses - List - Table - Hooks - UseCreate - helpers
 */

// Types
import { Course } from '../../../../types/course.d'
import { UseHookOutput, UseHookProps } from '../../../../types/hook.d'
import { CourseFilter } from '../types'

export interface CreateCourseVariables {
  course: Course
}

export interface UseCreateCourseProps extends UseHookProps<CreateCourseVariables> {
  accountId: number
  filters: CourseFilter
}

export interface UseCreateCourseOutput extends UseHookOutput {
  createCourse: any
}

export interface CourseQueryData {
  courses: Course[]
}
