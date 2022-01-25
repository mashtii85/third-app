/**
 * Components - Enrollments - Hooks - UseCreate- Types.d
 */

// Apollo
import { ApolloError } from '@apollo/client'

// Types
import { LooseObject } from '../../../../types/object.d'

export interface UseCreateEnrollmentProps {
  userId: number
  onCompleted: (data: { course: any }) => void
  onError: (data: ApolloError) => void
  filters?: LooseObject
}
