/**
 * Components - Locations - List - Table - Hooks - useDeleteCourse - useDeleteCourse
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_LOCATION } from '@availabletowork/queries'

// Types
import {
  LocationUpdateData,
  LocationUpdateVariables,
  UseHookProps,
  UseUpdateLocationOutput
} from '@availabletowork/types'

export const useUpdateLocation = (
  props: UseHookProps<LocationUpdateData>
): UseUpdateLocationOutput => {
  const [updateLocation, { loading, error, data }] = useMutation<
    LocationUpdateData,
    LocationUpdateVariables
  >(UPDATE_LOCATION, {
    onCompleted: props.onCompleted,
    onError: props.onError
  })
  return { data, error, loading, updateLocation }
}
