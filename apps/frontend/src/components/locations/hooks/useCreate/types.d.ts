/**
 * Components - Locations - Hooks - UseCreate - Types.d
 */

import { UseHookOutput, UseHookProps } from '../../../../types/hook'
import { Location, LocationFilter } from '../../types'

export interface CreateLocationVariables {
  location: Location
}

export interface UseCreateLocationProps extends UseHookProps<CreateLocationVariables> {
  // accountId: number
  filters: LocationFilter
}

export interface UseCreateLocationOutput extends UseHookOutput {
  createLocation: any
  data?: CreateLocationVariables | null
}
