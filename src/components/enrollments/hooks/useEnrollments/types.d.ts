/**
 * Components - Enrollments - Hooks - UseEnrollments - Types.d
 */

// Apollo
import { ApolloError } from '@apollo/client'

// Types
import { LooseObject } from '../../../../types/object'
import { STATUS_ACTIVE } from '../../../../types/select'
import { OrderBy } from '../../../../types/orderBy'
import { User } from '../../../../types/user'
import { AggregateData } from '../../../../types/aggregateData'
import { Course } from '../../../../types/course.d'

export interface Enrollment {
  course: Course
  user: User
  completed_lessons: AggregateData
  created_at: string
  id: number
  status: STATUS_ACTIVE
}

export interface EnrollmentData {
  enrollments: [Enrollment] | []
}

export interface EnrollmentOutputData {
  loading: boolean
  error?: ApolloError
  enrollments: [Enrollment] | []
}

export interface EnrollmentVariables {
  where: LooseObject | null
}

export interface EnrollmentFilters {
  q?: string
  limit?: number
  offset?: number
  orderBy?: OrderBy
  status?: STATUS_ACTIVE
  userStatus?: STATUS_ACTIVE
  clientId?: number
  courseId?: number
  accountId?: number
}
