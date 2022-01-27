/**
 * Components - Courses - List - Table - Hooks - UseCreate - helpers
 */

// Types
import { Course, CourseFilter } from '.'
import { UseHookOutput, UseHookProps } from '../general'

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
