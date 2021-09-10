/**
 * Components - Enrollments - Hooks - Types.d
 */

// Types
import { Course } from '../../../types/course'
import { ApolloError } from '@apollo/client'

export interface EnrollmentsData {
  enrollments: [{ course: Course }] | []
}

export interface EnrollmentsOutputData {
  loading: boolean
  error?: ApolloError
  enrollments: [] | [{ course: Course }]
}

export interface EnrollmentsVariables {
  userId: number
}

// userEnrolledUser
export interface EnrolledUserData {
  enrollments: [{ course: Course }] | []
}

export interface EnrolledUserOutputData {
  loading: boolean
  error?: ApolloError
  enrollments: [] | [{ course: Course }]
}

export interface EnrolledUserVariables {
  courseId: number
}
