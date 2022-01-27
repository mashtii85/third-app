/**
 * Components - Courses - List - Table - Hooks - Types.d
 */

// Types
import { Course, CourseFilter } from '.'
import { UseHookOutput } from '../general'

export interface UseCourseOutput extends UseHookOutput {
  courseList: Course[]
}

export interface UseCoursesProps {
  filters?: CourseFilter
}
