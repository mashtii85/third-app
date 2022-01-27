/**
 * Components - Enrollments - Hooks - UseCreate- Types.d
 */

// Types
import { ApolloError } from '@apollo/client'
import { LooseObject } from '../general'

export interface UseCreateEnrollmentProps {
  userId: number
  onCompleted: (data: { course: any }) => void
  onError: (data: ApolloError) => void
  filters?: LooseObject
}
