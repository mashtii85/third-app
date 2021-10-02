/**
 * Components - Courses - List - Table - Hooks - Types.d
 */

// Types
import { Course } from '../../../../types/course.d'
import { LooseObject } from '../../../../types/object.d'
import { UseHookOutput } from '../../../../types/hook.d'
import { CourseFilter } from '../types'

export type CoursesVariables = LooseObject

export interface UseCourseOutput extends UseHookOutput {
  courseList: Course[]
}

export interface UseCoursesProps {
  accountId: number
  filters?: CourseFilter
}
