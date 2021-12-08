/**
 * Components - Select - Hooks - helpers
 */
import { ApolloError } from '@apollo/client'
import { UseHookOutput } from '../../../../types/hook'

import { Options } from '../../../types/options'

export interface SelectData {
  options: Options[]
}

export interface UseSelectOutput extends UseHookOutput {
  loading: boolean
  error?: ApolloError
  options: Options[]
}
