/**
 * Components - Locations - Hooks - UseDeleteLocations - Types.d
 */

// Types
import { UseHookProps } from '../general'
import { Location, LocationFilter } from './locations'

export interface LocationDeleteVariables {
  locationId: number
}

export interface LocationDeleteData {
  location: Location
}

export interface useDeleteLocationProps extends UseHookProps<LocationDeleteData> {
  filters: LocationFilter
}
export interface useDeleteLocationOutput {
  data?: LocationDeleteData | null
  deleteLocation: any
  loading: boolean
}
