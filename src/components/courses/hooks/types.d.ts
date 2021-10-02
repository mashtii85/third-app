/**
 * Components - Courses - List - Table - Hooks - Types.d
 */

// Types
import { STATUS_ACTIVE } from '../../../types/select.d'
import { Course } from '../../../types/course.d'
import { ApolloError } from '@apollo/client'
import { Filter } from '../../../types/filter.d'

export interface CourseFilter extends Filter {
  status: STATUS_ACTIVE
  description: string
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
  accountId: number
  filters?: CourseFilter
}
