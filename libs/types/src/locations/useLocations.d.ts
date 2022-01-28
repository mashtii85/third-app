/**
 * Components - Locations - Hooks - UseLocations - Types.d
 */

//Types
import { UseHookOutput } from '../general'
import { Location, LocationFilter } from './locations'

export interface UseLocationsProps {
  filters: LocationFilter
}

export interface UseLocationsOutput extends UseHookOutput {
  locationList: Location[]
}

export interface LocationsData {
  locations: Location[]
}

export interface PrepareLocationArgumentProps {
  filters?: LocationFilter
}

export interface LocationQuery {
  locations: Location[]
}
