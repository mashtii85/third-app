/**
 * Components - Locations - Hooks - useLocations
 */

// Apollo
import { useQuery } from '@apollo/client'
import { GET_LOCATIONS } from '@availabletowork/queries'

// Types
import { LocationsData, UseLocationsOutput, UseLocationsProps } from '@availabletowork/types'

// Helpers
import { prepareLocationsArguments } from './helpers'

export const useLocations = ({ filters }: Partial<UseLocationsProps>): UseLocationsOutput => {
  const variables = prepareLocationsArguments({ filters })

  const { data, error, loading } = useQuery<LocationsData>(GET_LOCATIONS, {
    variables
  })

  return { error, loading, locationList: data?.locations || [] }
}
