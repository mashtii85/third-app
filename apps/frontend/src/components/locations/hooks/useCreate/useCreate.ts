/**
 * Components - Locations - List - Table - Hooks - UseLocationQuery
 */

// Types
import {
  CreateLocationVariables,
  Location,
  LocationDeleteVariables,
  LooseObject,
  UseCreateLocationProps,
  UseCreateLocationOutput
} from '@availabletowork/types'

// Apollo
import { useMutation } from '@apollo/client'
import { CREATE_LOCATION, GET_LOCATIONS } from '../../queries'

import { prepareLocationsArguments } from '../useLocations/helpers'

export const useCreateLocation = (props: UseCreateLocationProps): UseCreateLocationOutput => {
  const [createLocation, { error, loading, data }] = useMutation<
    CreateLocationVariables,
    LocationDeleteVariables
  >(CREATE_LOCATION, {
    onCompleted: props.onCompleted,
    onError: props.onError,
    update(cache, { data }) {
      if (!data?.location) {
        return
      }
      const locationFromResponse = data.location
      const variables: LooseObject = prepareLocationsArguments({
        filters: props.filters
        // accountId: props.accountId
      })

      variables.account_id = { _eq: props?.filters?.accountId }
      const { locations } = cache.readQuery<{ locations: Location[] }, any>({
        query: GET_LOCATIONS,
        variables
      }) || { locations: [] }

      cache.writeQuery<{ locations: Location[] }>({
        query: GET_LOCATIONS,
        variables,
        data: { locations: [...locations, locationFromResponse] }
      })
    }
  })

  return { data, error, createLocation, loading }
}
