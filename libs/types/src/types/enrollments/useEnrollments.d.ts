/**
 * Components - Enrollments - Hooks - UseEnrollments - Types.d
 */

// Constants
import { STATUS_ACTIVE } from '@availabletowork/constants'

// Types
import { ApolloError } from '@apollo/client'
import { User } from '../users'
import { Course } from '../courses'
import { AggregateData, LooseObject, OrderBy } from '../general'

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
  q: string
  limit: number
  offset: number
  orderBy: OrderBy
  status: STATUS_ACTIVE
  userStatus: STATUS_ACTIVE
  clientId: number
  courseId: number
  accountId: number
}
