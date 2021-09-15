/**
 * Components - Enrollments - Hooks - Types.d
 */

// Types
import { Course } from '../../../types/course'
import { ApolloError } from '@apollo/client'
import { LooseObject } from '../../../types/object'
import { STATUS_ACTIVE } from '../../../../types/select'
import { OrderBy } from '../../../../types/orderBy'

export interface Enrollment {
  course: Course
  created_at: string
  id: number
  status: STATUS_ACTIVE
}

export interface EnrollmentsData {
  enrollments: [Enrollment] | []
}

export interface EnrollmentsOutputData {
  loading: boolean
  error?: ApolloError
  enrollments: [] | [Enrollment]
}

export interface EnrollmentsVariables {
  where?: LooseObject
}

export interface EnrollmentsFilters {
  q: string
  limit: number
  offset: number
  orderBy: OrderBy
  status: STATUS_ACTIVE
}
