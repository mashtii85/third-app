/**
 * Types - Hook
 */

import { ApolloError } from '@apollo/client'

export interface UseHookProps<T> {
  onCompleted: (data: T) => void
  onError: (data: ApolloError) => void
}

export interface UseHookOutput {
  loading: boolean
  error?: ApolloError
}
