/**
 * Components - Courses - List - Table - Hooks - Types.d
 */

// Types
import { Course } from '../../../../types/course.d'
import { UseHookOutput } from '../../../../types/hook.d'
import { CourseFilter } from './hooks'

export interface UseCourseOutput extends UseHookOutput {
  courseList: Course[]
}

export interface UseCoursesProps {
  filters?: CourseFilter
}
