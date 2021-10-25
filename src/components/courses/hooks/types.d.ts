/**
 * Components - Courses - Hooks - Types.d
 */

// Types
import { STATUS_ACTIVE } from '../../../types/select.d'
import { Course } from '../../../types/course.d'
import { ApolloError } from '@apollo/client'
import { Filter } from '../../../types/filter.d'
import { Account } from '../../../types/account'
import { Options } from '../../../types/options'

export interface CourseFilter extends Filter {
  id: number
  accountId: number
  clientId?: number
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

export type CourseDB = Course & Account
export interface CourseData {
  course: Course
}

export interface PrepareCourseArgumentProps {
  filters?: Partial<CourseFilter>
}
