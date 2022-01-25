/**
 * Components - Courses - List - Table - Hooks - UseCreate - helpers
 */

// Types
import { Course } from '../../../../types/course.d'
import { UseHookOutput, UseHookProps } from '../../../../types/hook.d'
import { CourseFilter } from './hooks'

export interface CreateCourseVariables {
  course: Course
}

export interface UseCreateCourseProps extends UseHookProps<CreateCourseVariables> {
  filters: Partial<CourseFilter>
}

export interface UseCreateCourseOutput extends UseHookOutput {
  createCourse: any
}

export interface CourseQueryData {
  courses: Course[]
}
