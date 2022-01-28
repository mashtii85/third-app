/**
 * Components - Courses - Hooks - Types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { Course } from '.'
import { Filter, Options } from '../general'
import { ApolloError } from '@apollo/client'
import { Account } from '../accounts'

export interface CourseFilter extends Filter {
  id: number
  accountId: number
  clientId?: number
  status: STATUS_ACTIVE
  taxonomy: Partial<Options>
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

export type CourseDB = Course & Account
export interface CourseData {
  course: Course
}

export interface PrepareCourseArgumentProps {
  filters?: Partial<CourseFilter>
}
