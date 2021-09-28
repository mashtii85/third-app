/**
 * Components - Courses - List - Table - Hooks - helpers
 */

// Types
import { STATUS_ACTIVE } from '../../../types/select.d'
import { Course } from '../../../types/course.d'
import { ApolloError } from '@apollo/client'
import { Filter } from '../../../types/filter.d'
import { UseHookOutput } from '../../../types/hook.d'
import { LooseObject } from '../../../types/object.d'

export interface CourseFilter extends Filter {
  status: STATUS_ACTIVE
  description: string
}

export interface UseCoursesProps {
  accountId: number
  filters?: CourseFilter
}

export interface CoursesData {
  courses: Course[]
}

export type CoursesVariables = LooseObject

export interface EnrollmentsData {
  enrollments: [{ course: Course }] | []
}

export interface EnrolmentOutputData {
  loading: boolean
  error?: ApolloError
  enrollments: [] | [{ course: Course }]
}

export interface EnrolledVariables {
  userId: number
}

// useCourse

export interface CourseData {
  course: Course
}

export interface CourseVariables {
  courseId: number
}

// useCreateCourse
export interface UseCreateCourseProps {
  accountId: number
  onCompleted: (data: { course: Course }) => void
  onError: (data: ApolloError) => void
  filters: CourseFilter
}

export interface UseCreateCourseOutput extends UseHookOutput {
  createCourse: any
}

export interface PrepareCourseArgumentProps {
  accountId: number
  filters?: CourseFilter
}
