/**
 * Components - Courses - List - Table - Hooks - Types.d
 */

// Types
import { STATUS_ACTIVE } from '../../../types/select.d'
import { Course } from '../../../types/course.d'
import { ApolloError } from '@apollo/client'
import { Filter } from '../../../types/filter.d'
import { Options } from '../../../types/taxonomy'

export interface CourseFilter extends Filter {
  id: number
  accountId: number
  status: STATUS_ACTIVE
  taxonomy: Options
}

export interface CoursesData {
  courses: Course[]
}

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

export interface PrepareCourseArgumentProps {
  filters?: Partial<CourseFilter>
}
