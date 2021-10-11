/**
 * Components - Locations - Hooks - UseLocations - Types.d
 */

import { UseHookOutput } from '../../../../types/hook'
import { Location, LocationFilter } from '../../types.d'

export interface UseLocationsProps {
  filters: LocationFilter
}

export interface UseLocationsOutput extends UseHookOutput {
  locationList: Location[]
}

export interface LocationsData {
  locations: Location[]
}

export interface LocationsVariables {}

export interface PrepareLocationArgumentProps {
  filters?: LocationFilter
}
