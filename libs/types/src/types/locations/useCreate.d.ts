/**
 * Components - Locations - Hooks - UseCreate - Types.d
 */

//Types
import { UseHookOutput, UseHookProps } from '../general'
import { Location, LocationFilter } from './locations'

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
