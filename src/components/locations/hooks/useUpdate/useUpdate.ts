/**
 * Components - Locations - List - Table - Hooks - useDeleteCourse - useDeleteCourse
 */

// Apollo
import { useMutation } from '@apollo/client'
import { UPDATE_LOCATION } from '../../queries'

// Types
import { LocationUpdateData, LocationUpdateVariables, UseUpdateLocationOutput } from './types.d'
import { UseHookProps } from '../../../../types/hook.d'

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
