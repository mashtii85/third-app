/**
 * Components - Courses - List - Table - Hooks - helpers
 */

// Types
import { OrderBy } from '../../../types/orderBy.d'
import { STATUS_ACTIVE } from '../../../types/select.d'
import { Course } from '../../../types/course'
import { ApolloError } from '@apollo/client'
import { LooseObject } from '../../../types/object'

export interface CourseFilter {
  status: STATUS_ACTIVE
  description: string
  title?: string
  limit: number
  offset: number
  orderBy: OrderBy
}

export interface UseCoursesProps {
  clientId: number
  filters?: CourseFilter
}

export interface CoursesData {
  courses: Course[]
}

export interface CoursesVariables {
  where: LooseObject
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

export interface CourseVariables {
  courseId: number
}
