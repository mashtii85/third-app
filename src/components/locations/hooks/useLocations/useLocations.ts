/**
 * Components - Locations - Hooks - useLocations
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_LOCATIONS } from '../../queries'

// Types
import { LocationsData, LocationsVariables, UseLocationsOutput, UseLocationsProps } from './types.d'

// Helpers
import { prepareLocationsArguments } from './helpers'

export const useLocations = ({ filters }: Partial<UseLocationsProps>): UseLocationsOutput => {
  const variables = prepareLocationsArguments({ filters })

  const { data, error, loading } = useQuery<LocationsData, LocationsVariables>(GET_LOCATIONS, {
    variables
  })

  return { error, loading, locationList: data?.locations || [] }
}
