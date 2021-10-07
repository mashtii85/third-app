/**
 * Components - Locations - Hooks - UseDelete - UseDelete
 */

// Apollo
import { useMutation } from '@apollo/client'
import { DELETE_LOCATION, GET_LOCATIONS } from '../../queries'

// Helpers
import { prepareLocationsArguments } from '../useLocations/helpers'

// Types
import {
  LocationDeleteData,
  LocationDeleteVariables,
  useDeleteLocationProps,
  useDeleteLocationOutput
} from './types.d'
import { LooseObject } from '../../../../types/object.d'
import { LocationQuery } from '../types'

export const useDeleteLocation = (props: useDeleteLocationProps): useDeleteLocationOutput => {
  const [deleteLocation, { loading }] = useMutation<LocationDeleteData, LocationDeleteVariables>(
    DELETE_LOCATION,
    {
      onCompleted: props.onCompleted,
      onError: props.onError,
      update(cache, { data }) {
        const variables: LooseObject = prepareLocationsArguments({
          filters: props.filters,
          accountId: props.accountId
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
    }
  )
  return { deleteLocation, loading }
}
