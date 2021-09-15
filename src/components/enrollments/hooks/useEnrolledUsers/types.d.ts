/**
 * Components - Enrollments - Hooks - UseEnrolledUsers - Types.d
 */

// Apollo
import { ApolloError } from '@apollo/client'

// Types
import { LooseObject } from '../../../../types/object'
import { STATUS_ACTIVE } from '../../../../types/select'
import { OrderBy } from '../../../../types/orderBy'
import { User } from '../../../../types/user'
import { AggregateData } from '../../../../types/aggregateData'
import { CustomFields } from '../../../../types/course'

export interface Enrolled {
  course: { title: string; custom_fields?: CustomFields }
  user: User
  completed_lessons: AggregateData
  created_at: string
  id: number
  status: STATUS_ACTIVE
}

// userEnrolledUser
export interface EnrolledUsersData {
  enrollments: [Enrolled] | []
}

export interface EnrolledUsersOutputData {
  loading: boolean
  error?: ApolloError
  enrollments: [Enrolled] | []
}

export interface EnrolledUsersVariables {
  where: LooseObject | null
}

export interface EnrolledUsersFilters {
  q: string
  limit: number
  offset: number
  orderBy: OrderBy
  status: STATUS_ACTIVE
  userStatus: STATUS_ACTIVE
}
