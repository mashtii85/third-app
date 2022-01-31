/**
 * Components - Locations - Hooks - UseDelete - UseDelete
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_LOCATION, GET_LOCATIONS } from '@availabletowork/queries'

// Helpers
import { prepareLocationsArguments } from '../useLocations/helpers'

// Types
import {
  Location,
  LocationDeleteData,
  LocationDeleteVariables,
  LocationQuery,
  GQLClause,
  useDeleteLocationProps,
  useDeleteLocationOutput
} from '@availabletowork/types'

export const useDeleteLocation = (props: useDeleteLocationProps): useDeleteLocationOutput => {
  const [deleteLocation, { loading, data }] = useMutation<
    LocationDeleteData,
    LocationDeleteVariables
  >(DELETE_LOCATION, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      const variables: GQLClause<Location> = prepareLocationsArguments({
        filters: props.filters
      })

      const { locations } = cache.readQuery<LocationQuery>({
        query: GET_LOCATIONS,
        variables
      }) || { locations: [] }

      const locationList = locations.filter((location) => location.id !== data?.location.id)
      cache.writeQuery<LocationQuery>({
        query: GET_LOCATIONS,
        variables,
        data: { locations: locationList }
      })
    }
  })
  return { data, deleteLocation, loading }
}
