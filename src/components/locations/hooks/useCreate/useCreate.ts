/**
 * Components - Locations - List - Table - Hooks - UseLocationQuery
 */

// Apollo
import { useMutation } from '@apollo/client'
import { LooseObject } from '../../../../types/object'
import { CREATE_LOCATION, GET_LOCATIONS } from '../../queries'
import { Location } from '../../types'
import { LocationDeleteVariables } from '../useDelete/types'

import { prepareLocationsArguments } from '../useLocations/helpers'

// Types
import { UseCreateLocationProps, UseCreateLocationOutput, CreateLocationVariables } from './types.d'

export const useCreateLocation = (props: UseCreateLocationProps): UseCreateLocationOutput => {
  const [createLocation, { error, loading }] = useMutation<
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
        filters: props.filters,
        accountId: props.accountId
      })

      variables.account_id = { _eq: props.accountId }
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

  return { error, createLocation, loading }
}
