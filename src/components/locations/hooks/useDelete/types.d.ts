/**
 * Components - Locations - Hooks - UseDeleteLocations - Types.d
 */

// Types.d
import { UseHookProps } from '../../../../types/hook.d'
import { Location, LocationFilter } from '../../types'

export interface LocationDeleteVariables {
  locationId: number
}

export interface LocationDeleteData {
  location: Location
}

export interface useDeleteLocationProps extends UseHookProps<LocationDeleteData> {
  filters: LocationFilter
  // accountId: number
}
export interface useDeleteLocationOutput {
  deleteLocation: any
  loading: boolean
}
